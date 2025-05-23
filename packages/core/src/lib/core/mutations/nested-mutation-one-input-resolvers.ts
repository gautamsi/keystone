import type { KeystoneContext, GraphQLTypesForList } from '../../../types'
import type { InitialisedList } from '../initialise-lists'
import { userInputError } from '../graphql-errors'
import type { NestedMutationState } from './'
import { checkUniqueItemExists } from '../access-control'
import type { InferValueFromArg, GArg, GNonNull } from '@graphql-ts/schema'

type _CreateValueType = Exclude<
  InferValueFromArg<GArg<Exclude<GraphQLTypesForList['relateTo']['one']['create'], undefined>>>,
  null | undefined
>
type _UpdateValueType = Exclude<
  InferValueFromArg<
    GArg<GNonNull<Exclude<GraphQLTypesForList['relateTo']['one']['update'], undefined>>>
  >,
  null | undefined
>

async function handleCreateAndUpdate(
  value: _CreateValueType,
  nestedMutationState: NestedMutationState,
  context: KeystoneContext,
  foreignList: InitialisedList
) {
  if (value.connect) {
    return { connect: await checkUniqueItemExists(value.connect, foreignList, context, 'connect') }
  }

  if (value.create) {
    const { id } = await nestedMutationState.create(value.create, foreignList)
    return { connect: { id } }
  }
}

export function resolveRelateToOneForCreateInput(
  nestedMutationState: NestedMutationState,
  context: KeystoneContext,
  foreignList: InitialisedList
) {
  return async (value: _CreateValueType) => {
    const numOfKeys = Object.keys(value).length
    if (numOfKeys !== 1) {
      throw userInputError(
        `You must provide "connect" or "create" in to-one relationship inputs for "create" operations.`
      )
    }
    return handleCreateAndUpdate(value, nestedMutationState, context, foreignList)
  }
}

export function resolveRelateToOneForUpdateInput(
  nestedMutationState: NestedMutationState,
  context: KeystoneContext,
  foreignList: InitialisedList
) {
  return async (value: _UpdateValueType) => {
    if (Object.keys(value).length !== 1) {
      throw userInputError(
        `You must provide one of "connect", "create" or "disconnect" in to-one relationship inputs for "update" operations.`
      )
    }

    if (value.connect || value.create) {
      return handleCreateAndUpdate(value, nestedMutationState, context, foreignList)
    }

    if (value.disconnect) {
      return { disconnect: true }
    }
  }
}
