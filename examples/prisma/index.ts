import path from 'path';
import fs from 'fs';
import { uniq } from 'lodash';
import { camelCase, pascalCase, capitalCase } from 'change-case';
import { singular, isPlural, plural } from 'pluralize';
import { DMMF } from '@prisma/generator-helper';
import { getDMMF, getSchema } from '@prisma/internals';

function getType(type: string) {
  switch (type) {
    case 'String':
      return 'text';
    case 'Int':
      return 'integer';
    case 'DateTime':
      return 'timestamp';
    case 'BigInt':
      return 'bigInt';
    case 'Boolean':
      return 'checkbox';
    case 'Json':
      return 'json';
    case 'Decimal':
      return 'decimal';
    case 'String':
      return 'text';
    case 'String':
      return 'text';
    case 'String':
      return 'text';
    case 'String':
      return 'text';

    default:
      return `UNDEFINED__${type}`;
  }
}

function getDefaultValue(fieldName: string, field: DMMF.Field) {
  if (field.type === 'DateTime') {
    // handle date time default with db info
    if (field.isUpdatedAt) return `defaultValue: { kind: 'now' }, db: { updatedAt: true }`;
    if (fieldName === 'updatedAt') return `defaultValue: { kind: 'now' }, db: { updatedAt: true }`;
    if (fieldName === 'createdAt') return `defaultValue: { kind: 'now' }`;
    return '';
  }
  if (!field.hasDefaultValue) return '';

  switch (field.type) {
    case 'Boolean':
    case 'Int':
      return `defaultValue: ${field.default}`;
    case 'String':
      return `defaultValue: '${field.default}'`;
    default:
      if (field.kind === 'enum') return `defaultValue: '${field.default}'`;
      return '';
  }
}

function getRelationshipRef(fieldMap: FieldInfo, allModels: DMMF.Model[], listMap: ListInfoMap) {
  const field = fieldMap.field;
  let otherModel: DMMF.Model | undefined;
  // let otherField: DMMF.Field | undefined;
  let otherField: FieldInfo | undefined;
  if (field.relationName) {
    otherModel = allModels.find(m => m.fields.some(f => f !== field && f.relationName === field.relationName));
    otherField = Object.values(listMap[otherModel?.name!].fieldMap).find(f => f.field !== field && f.field.relationName === field.relationName);
    // otherField = otherModel?.fields.find(f => f !== field && f.relationName === field.relationName);
  }
  // const twoWay = otherField && otherField?.isList;
  const twoWay = (otherField?.field?.relationFromFields?.length || field.relationFromFields?.length) || (field.isList && otherField?.field?.isList);
  const otherFieldLabel = otherField?.field.isList ? otherField.camel : singular(otherField?.camel!);
  if (otherField?.camel !== otherFieldLabel) console.log(otherField?.camel, otherFieldLabel, otherField?.field.name);
  const ref = twoWay ? `${listMap[field.type].pascal}.${otherFieldLabel}` : listMap[field.type].pascal;
  return ref;
}

function getEnumValues(enumType: string, dmmf: DMMF.Datamodel) {
  const enumObj = dmmf.enums.find(e => e.name === enumType);
  return enumObj?.values.map(e => `{ label: '${capitalCase(e.name)}', value: '${(e.dbName || e.name || '').toLowerCase()}' }`).join(',\n');
}

async function getListConfig(dmmf: DMMF.Document, name: string, listMap: ListInfoMap) {
  // const model = dmmf.datamodel.models.find(m => m.name === name);
  const listItem = listMap[name];
  const model = listItem.model;

  const listConfig: any = { fields: [], db: '' };

  const listImports = [];

  for (const item in listItem.fieldMap) {
    const fieldItem = listItem.fieldMap[item];
    const field: DMMF.Field = fieldItem.field;
    // console.log(field.name, field.kind);
    // check id field first
    if (fieldItem.name === 'id') {
      if (field.default?.name === 'autoincrement') {
        listConfig.db = `db: { idField: { kind: 'autoincrement', type: '${field.type}' } },`;
      }
      continue;
    }

    // rest of the fields
    if (field.kind === 'scalar') {
      // process scaler field first
      if (!field.isReadOnly) {
        const fieldType = getType(field.type);
        listImports.push(fieldType);
        listConfig.fields.push(`${fieldItem.camel}: ${fieldType}({ ${getDefaultValue(fieldItem.camel, field)} })`);
      }
    }
    // rest of the fields
    if (field.kind === 'enum') {
      // process scaler field first
      if (!field.isReadOnly) {
        listImports.push('select');
        listConfig.fields.push(`${fieldItem.camel}: select({ options: [${getEnumValues(field.type, dmmf.datamodel)}], ${getDefaultValue(fieldItem.camel, field)} })`);
      }
    }

    if (field.kind === 'object') {
      // process scaler field first
      listImports.push('relationship');
      const many = field.isList;
      const fieldSingular = many ? fieldItem.camel : singular(fieldItem.camel);
      if (fieldSingular !== fieldItem.camel) console.log(fieldSingular, fieldItem.camel);
      listConfig.fields.push(`${fieldSingular}: relationship({ ref: '${getRelationshipRef(fieldItem, dmmf.datamodel.models, listMap)}'${many ? ', many: true' : ''} })`);
    }

  }
  console.log(listItem.pascal, model?.primaryKey, model?.uniqueFields, model?.uniqueIndexes);
  console.log(path.resolve(`./schemas/${listItem.singular}`));
  fs.mkdirSync(`./schemas/`, { recursive: true });
  console.log(listConfig.fields.length);
  console.log(listConfig.fields.join('\n'));
  fs.writeFileSync(`./schemas/${camelCase(listItem.singular)}.ts`, `
import { list } from '@keystone-6/core';
import { ${uniq(listImports).join(',')} } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const ${listItem.pascal}: Lists.${listItem.pascal} = list({
  access: allowAll,
  ${listConfig.db}
  fields: {
    ${listConfig.fields.join(',\n    ')}
  }
});
`, 'utf8');

  return [listItem.pascal, `./${camelCase(listItem.singular)}`];
}

type FieldInfo = { name: string; camel: string; field: DMMF.Field; list: ListInfo; };
type FieldInfoMap = Record<string, FieldInfo>;

function getListFieldsMap(listInfo: ListInfo) {
  const model = listInfo.model;
  const fieldMap: FieldInfoMap = {};
  for (const field of model.fields) {
    console.log('came;', camelCase(field.name), field.name);
    fieldMap[field.name] = {
      name: field.name,
      camel: camelCase(field.name),
      field,
      list: listInfo,
    };
  }
  return fieldMap;
}

type ListInfo = { name: string; singular: string; pascal: string; fieldMap: FieldInfoMap; model: DMMF.Model; };
type ListInfoMap = Record<string, ListInfo>;
function getListMap(dms: DMMF.Datamodel) {
  const listMap: ListInfoMap = {};

  for (const model of dms.models) {
    const name = isPlural(model.name) ? singular(model.name) : model.name;
    console.log(name, pascalCase(name), model.name, model.dbName);
    const listInfo = {
      name: model.name,
      model,
      singular: name,
      pascal: pascalCase(name),
      fieldMap: {},
    };
    listMap[model.name] = { ...listInfo, fieldMap: getListFieldsMap(listInfo) };
  }
  return listMap;
}

(async () => {
  const schema = await getSchema();
  const dmmf = await getDMMF({ datamodelPath: './schema_pulled.prisma' });

  const listMap = getListMap(dmmf.datamodel);
  // console.log(JSON.stringify(listMap.users, null, 2));
  // return;
  // const { datamodel, schema: { enumTypes } } = dmmf;
  // fs.writeFileSync('./prisma_pulled.json', JSON.stringify({ datamodel, schema: { enumTypes } }, null, 2), 'utf8'); return;
  // fs.writeFileSync('./prisma_4.json', JSON.stringify(dmmf, null, 2), 'utf8'); return;
  const importLines = [];
  const listNames = [];
  for (const model of dmmf.datamodel.models) {
    console.log();
    const [listName, listFile] = await getListConfig(dmmf, model.name, listMap);
    importLines.push(`import { ${listName} } from '${listFile}';`);
    listNames.push(listName);
  }
  fs.writeFileSync(`./schemas/index.ts`, `
${importLines.join('\n')}

export const lists = {
  ${listNames.join(',\n  ')}
}
`, 'utf8');
  debugger;
  // console.log(dmmf.datamodel.types);
  // console.log(dmmf.datamodel.enums);
  // console.log(dmmf.datamodel.models);
})();;