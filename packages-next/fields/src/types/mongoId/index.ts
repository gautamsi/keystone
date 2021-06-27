import {
  BaseGeneratedListTypes,
  FieldDefaultValue,
  fieldType,
  FieldTypeFunc,
  CommonFieldConfig,
  legacyFilters,
  orderDirectionEnum,
  schema,
} from '@keystone-next/types';
import { resolveView } from '../../resolve-view';
import { getIndexType } from '../../get-index-type';

export type MongoIdFieldConfig<TGeneratedListTypes extends BaseGeneratedListTypes> =
  CommonFieldConfig<TGeneratedListTypes> & {
    defaultValue?: FieldDefaultValue<string, TGeneratedListTypes>;
    isRequired?: boolean;
    isIndexed?: boolean;
    isUnique?: boolean;
    gqlType?: 'ID' | 'String';
  };

export const mongoId =
  <TGeneratedListTypes extends BaseGeneratedListTypes>({
    isRequired,
    defaultValue,
    isIndexed,
    isUnique,
    gqlType,
    ...config
  }: MongoIdFieldConfig<TGeneratedListTypes> = {}): FieldTypeFunc =>
  meta => {
    const type = meta.fieldKey === 'id' || gqlType === 'ID' ? schema.ID : schema.String;
    const __legacy = {
      isRequired,
      defaultValue,
      filters: {
        fields: {
          ...legacyFilters.fields.equalityInputFields(meta.fieldKey, type),
          ...legacyFilters.fields.orderingInputFields(meta.fieldKey, type),
          ...legacyFilters.fields.inInputFields(meta.fieldKey, type),
        },
        impls: {
          ...equalityConditions(meta.fieldKey, x => Number(x) || -1),
          ...legacyFilters.impls.orderingConditions(meta.fieldKey, x => Number(x) || -1),
          ...inConditions(meta.fieldKey, x => x.map((xx: any) => Number(xx) || -1)),
        },
      },
    };
    if (meta.fieldKey === 'id') {
      return fieldType({
        kind: 'scalar',
        mode: 'required',
        scalar: 'String',
        default: { kind: 'dbgenerated', extra: '@map("_id") @db.ObjectId' },
        nativeType: 'ObjectId @map("_id")'
      })({
        ...config,
        input: {
          // TODO: fix the fact that TS did not catch that a resolver is needed here
          uniqueWhere: {
            arg: schema.arg({ type }),
            resolve(value) {
              return value;
            },
          },
          orderBy: { arg: schema.arg({ type: orderDirectionEnum }) },
        },
        output: schema.field({
          type: schema.nonNull(schema.ID),
          resolve({ value }) {
            return value.toString();
          },
        }),
        views: resolveView('integer/views'),
        __legacy,
      });
    }
    const inputResolver = (val: number | string | null | undefined) => {
      if (val == null) {
        return val;
      }
      return Number(val);
    };
    return fieldType({
      kind: 'scalar',
      mode: 'optional',
      scalar: 'Int',
      default: { kind: 'dbgenerated', extra: '@map("_id") @db.ObjectId' },
      index: getIndexType({ isIndexed, isUnique }),
    })({
      ...config,
      input: {
        uniqueWhere: isUnique ? { arg: schema.arg({ type }), resolve: x => Number(x) } : undefined,
        create: { arg: schema.arg({ type }), resolve: inputResolver },
        update: { arg: schema.arg({ type }), resolve: inputResolver },
        orderBy: { arg: schema.arg({ type: orderDirectionEnum }) },
      },
      output: schema.field({
        type,
        resolve({ value }) {
          if (value === null) return null;
          return value?.toString();
        },
      }),
      views: resolveView('integer/views'),
      __legacy,
    });
  };

function equalityConditions<T>(fieldKey: string, f: (a: any) => any) {
  return {
    [fieldKey]: (value: T) => ({ [fieldKey]: f(value) }),
    [`${fieldKey}_not`]: (value: T) => ({ NOT: { [fieldKey]: f(value) } }),
  };
}

function inConditions<T>(fieldKey: string, f: (a: any) => any) {
  return {
    [`${fieldKey}_in`]: (value: (T | null)[]) =>
      value.includes(null)
        ? { [fieldKey]: { in: f(value.filter(x => x !== null)) } }
        : { [fieldKey]: { in: f(value) } },
    [`${fieldKey}_not_in`]: (value: (T | null)[]) =>
      value.includes(null)
        ? { AND: [{ NOT: { [fieldKey]: { in: f(value.filter(x => x !== null)) } } }] }
        : { NOT: { [fieldKey]: { in: f(value) } } },
  };
}
