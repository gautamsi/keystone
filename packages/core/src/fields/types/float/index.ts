import type { SimpleFieldTypeInfo } from '../../../types'
import {
  type BaseListTypeInfo,
  type FieldTypeFunc,
  type CommonFieldConfig,
  fieldType,
  orderDirectionEnum,
} from '../../../types'
import { g } from '../../..'
import { filters } from '../../filters'
import { makeValidateHook, defaultIsRequired } from '../../non-null-graphql'
import type { controller } from './views'

export type FloatFieldConfig<ListTypeInfo extends BaseListTypeInfo> = CommonFieldConfig<
  ListTypeInfo,
  SimpleFieldTypeInfo<'Float'>
> & {
  isIndexed?: boolean | 'unique'
  defaultValue?: number | null
  validation?: {
    isRequired?: boolean
    min?: number
    max?: number
  }
  db?: {
    isNullable?: boolean
    map?: string
    extendPrismaSchema?: (field: string) => string
  }
}

export function float<ListTypeInfo extends BaseListTypeInfo>(
  config: FloatFieldConfig<ListTypeInfo> = {}
): FieldTypeFunc<ListTypeInfo> {
  const { defaultValue: defaultValue_, isIndexed, validation = {} } = config

  const { isRequired = false, min, max } = validation
  const defaultValue = defaultValue_ ?? null

  return meta => {
    if (defaultValue !== null && !Number.isFinite(defaultValue)) {
      throw new Error(
        `${meta.listKey}.${meta.fieldKey} specifies a default value of: ${defaultValue} but it must be a valid finite number`
      )
    }
    if (min !== undefined && !Number.isFinite(min)) {
      throw new Error(
        `${meta.listKey}.${meta.fieldKey} specifies validation.min: ${min} but it must be a valid finite number`
      )
    }
    if (max !== undefined && !Number.isFinite(max)) {
      throw new Error(
        `${meta.listKey}.${meta.fieldKey} specifies validation.max: ${max} but it must be a valid finite number`
      )
    }
    if (min !== undefined && max !== undefined && min > max) {
      throw new Error(
        `${meta.listKey}.${meta.fieldKey} specifies a validation.max that is less than the validation.min, and therefore has no valid options`
      )
    }

    const hasAdditionalValidation = min !== undefined || max !== undefined
    const { mode, validate } = makeValidateHook(
      meta,
      config,
      hasAdditionalValidation
        ? ({ resolvedData, operation, addValidationError }) => {
            if (operation === 'delete') return

            const value = resolvedData[meta.fieldKey]
            if (typeof value === 'number') {
              if (min !== undefined && value < min) {
                addValidationError(`value must be greater than or equal to ${min}`)
              }

              if (max !== undefined && value > max) {
                addValidationError(`value must be less than or equal to ${max}`)
              }
            }
          }
        : undefined
    )

    return fieldType({
      kind: 'scalar',
      mode,
      scalar: 'Float',
      index: isIndexed === true ? 'index' : isIndexed || undefined,
      default:
        typeof defaultValue === 'number' ? { kind: 'literal', value: defaultValue } : undefined,
      map: config.db?.map,
      extendPrismaSchema: config.db?.extendPrismaSchema,
    })({
      ...config,
      ...defaultIsRequired(config, isRequired),
      hooks: {
        ...config.hooks,
        validate,
      },
      input: {
        uniqueWhere: isIndexed === 'unique' ? { arg: g.arg({ type: g.Float }) } : undefined,
        where: {
          arg: g.arg({ type: filters[meta.provider].Float[mode] }),
          resolve: mode === 'optional' ? filters.resolveCommon : undefined,
        },
        create: {
          arg: g.arg({
            type: g.Float,
            defaultValue: typeof defaultValue === 'number' ? defaultValue : undefined,
          }),
          resolve(value) {
            if (value === undefined) return defaultValue
            return value
          },
        },
        update: { arg: g.arg({ type: g.Float }) },
        orderBy: { arg: g.arg({ type: orderDirectionEnum }) },
      },
      output: g.field({ type: g.Float }),
      __ksTelemetryFieldTypeName: '@keystone-6/float',
      views: '@keystone-6/core/fields/types/float/views',
      getAdminMeta(): Parameters<typeof controller>[0]['fieldMeta'] {
        return {
          validation: {
            min: min ?? null,
            max: max ?? null,
          },
          defaultValue: defaultValue === null ? null : defaultValue.toString(),
        }
      },
    })
  }
}
