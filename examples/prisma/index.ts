import fs from 'fs';
import { camelCase, pascalCase } from 'change-case';
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
    case 'String':
      return 'text';
    case 'String':
      return 'text';
    case 'String':
      return 'text';
    case 'String':
      return 'text';
    case 'String':
      return 'text';
    case 'String':
      return 'text';
    case 'String':
      return 'text';

    default:
      break;
  }
}

function getRelationshipRef(field: DMMF.Field, model: DMMF.Model, allModels: DMMF.Model[]) {
  let otherModel: DMMF.Model | undefined;
  let otherField: DMMF.Field | undefined;
  if (field.relationName) {
    otherModel = allModels.find(m => m.fields.some(f => f !== field && f.relationName === field.relationName));
    otherField = otherModel?.fields.find(f => f !== field && f.relationName === field.relationName);
  }
  const twoWay = !!otherField?.relationToFields?.length;
  const ref = twoWay ? `${field.type}.${otherField?.name}` : field.type;
  return ref;
}

async function getListConfig(dmmf: DMMF.Document, name: string, listMap: ListMap) {
  // const model = dmmf.datamodel.models.find(m => m.name === name);
  const listItem = listMap[name];
  const model = listItem.model;
  console.log(listItem.pascal, model?.primaryKey, model?.uniqueFields, model?.uniqueIndexes);

  const listConfig: any = { fields: [], db: {} };

  for (const item in listItem.fieldMap) {
    const fieldItem = listItem.fieldMap[item];
    const field: DMMF.Field = fieldItem.field;
    // console.log(field.name, field.kind);
    // check id field first
    if (fieldItem.name === 'id') {
      if (field.default?.name === 'autoincrement') {
        listConfig.db.idField = { kind: 'autoincrement', type: field.default?.type };
      }
      continue;
    }

    // rest of the fields
    if (field.kind === 'scalar') {
      // process scaler field first
      if (!field.isReadOnly) {
        listConfig.fields.push(`${fieldItem.camel}: ${getType(field.type)}({${field.hasDefaultValue ? 'defaults' : ''}})`);
      }
    }
    if (field.kind === 'object') {
      // process scaler field first
      listConfig.fields.push(`${fieldItem.camel}: relationship({ref: ${getRelationshipRef(field, model, dmmf.datamodel.models)}, many: ${field.isList}})`);
    }

  }

  console.log(listConfig.fields.length);
  console.log(listConfig.fields);
}

type FeildMap = Record<string, { name: string; camel: string; field: DMMF.Field; }>;

function getListFieldsMap(model: DMMF.Model) {
  const fieldMap: FeildMap = {};
  for (const field of model.fields) {
    fieldMap[field.name] = {
      name: field.name,
      camel: camelCase(field.name),
      field,
    };
  }
  return fieldMap;
}

type ListMap = Record<string, { name: string; singular: string; pascal: string; fieldMap: FieldMap; model: DMMF.Model; }>;
function getListMap(dms: DMMF.Datamodel) {
  const listMap: ListMap = {};

  for (const model of dms.models) {
    const name = isPlural(model.name) ? singular(model.name) : model.name;
    console.log(name, pascalCase(name), model.name, model.dbName);
    listMap[model.name] = {
      name: model.name,
      model,
      singular: name,
      pascal: pascalCase(name),
      fieldMap: getListFieldsMap(model),
    };
  }
  return listMap;
}

(async () => {
  const schema = await getSchema();
  const dmmf = await getDMMF({ datamodelPath: './schema.prisma' });

  const listMap = getListMap(dmmf.datamodel);
  // console.log(JSON.stringify(listMap.users, null, 2));
  // return;
  // const { datamodel, schema: { enumTypes } } = dmmf;
  // fs.writeFileSync('./prisma_pulled.json', JSON.stringify({ datamodel, schema: { enumTypes } }, null, 2), 'utf8'); return;
  // fs.writeFileSync('./prisma_3.json', JSON.stringify(dmmf, null, 2), 'utf8'); return;
  for (const model of dmmf.datamodel.models) {
    console.log();
    await getListConfig(dmmf, model.name, listMap);
  }
  debugger;
  // console.log(dmmf.datamodel.types);
  // console.log(dmmf.datamodel.enums);
  // console.log(dmmf.datamodel.models);
})();