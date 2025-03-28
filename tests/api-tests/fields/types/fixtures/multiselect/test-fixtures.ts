import { multiselect } from '@keystone-6/core/fields'

type MatrixValue = (typeof testMatrix)[number]

export const name = 'multiselect'
export const typeFunction = multiselect
export const exampleValue = (matrixValue: MatrixValue) =>
  matrixValue === 'enum'
    ? ['thinkmill', 'atlassian']
    : matrixValue === 'string'
      ? ['something else', 'a string']
      : [1, 3]
export const exampleValue2 = (matrixValue: MatrixValue) =>
  matrixValue === 'enum'
    ? ['react', 'gelato']
    : matrixValue === 'string'
      ? ['a string', '1number']
      : [2, 4]
export const supportsNullInput = false
export const nonNullableDefault = true
export const neverNull = false
export const supportsUnique = false
export const supportsDbMap = true
export const skipRequiredTest = false
export const fieldConfig = (matrixValue: MatrixValue) => {
  if (matrixValue === 'enum' || matrixValue === 'string') {
    return {
      type: matrixValue,
      options:
        matrixValue === 'enum'
          ? [
              { label: 'Thinkmill', value: 'thinkmill' },
              { label: 'Atlassian', value: 'atlassian' },
              { label: 'Thomas Walker Gelato', value: 'gelato' },
              { label: 'Cete, or Seat, or Attend ¯\\_(ツ)_/¯', value: 'cete' },
              { label: 'React', value: 'react' },
            ]
          : matrixValue === 'string'
            ? [
                { label: 'A string', value: 'a string' },
                { label: 'Another string', value: 'another string' },
                { label: '1number', value: '1number' },
                { label: '@¯\\_(ツ)_/¯', value: '@¯\\_(ツ)_/¯' },
                { label: 'something else', value: 'something else' },
              ]
            : [],
    }
  }
  return {
    type: matrixValue,
    options: [
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 },
      { label: 'Three', value: 3 },
      { label: 'Four', value: 4 },
      { label: 'Five', value: 5 },
    ],
  }
}
export const fieldName = 'company'

export const testMatrix = ['enum', 'string', 'integer'] as const

export const getTestFields = (matrixValue: MatrixValue) => ({
  company: multiselect(fieldConfig(matrixValue)),
})

export const initItems = (matrixValue: MatrixValue) => {
  if (matrixValue === 'enum') {
    return [
      { name: 'a', company: ['thinkmill', 'atlassian', 'gelato'] },
      { name: 'b', company: ['atlassian', 'react'] },
      { name: 'c', company: ['gelato'] },
      { name: 'd', company: ['cete'] },
      { name: 'e', company: ['react'] },
      { name: 'f', company: [] },
      { name: 'g' },
    ]
  } else if (matrixValue === 'string') {
    return [
      { name: 'a', company: ['a string', '@¯\\_(ツ)_/¯', '1number'] },
      { name: 'b', company: ['@¯\\_(ツ)_/¯'] },
      { name: 'c', company: ['another string'] },
      { name: 'd', company: ['1number'] },
      { name: 'e', company: ['something else'] },
      { name: 'f', company: [] },
      { name: 'g' },
    ]
  } else if (matrixValue === 'integer') {
    return [
      { name: 'a', company: [1, 2, 3] },
      { name: 'b', company: [2] },
      { name: 'c', company: [3] },
      { name: 'd', company: [4] },
      { name: 'e', company: [5] },
      { name: 'f', company: [] },
      { name: 'g' },
    ]
  }
  return []
}

export const storedValues = (matrixValue: MatrixValue) => {
  if (matrixValue === 'enum') {
    return [
      { name: 'a', company: ['thinkmill', 'atlassian', 'gelato'] },
      { name: 'b', company: ['atlassian', 'react'] },
      { name: 'c', company: ['gelato'] },
      { name: 'd', company: ['cete'] },
      { name: 'e', company: ['react'] },
      { name: 'f', company: [] },
      { name: 'g', company: [] },
    ]
  } else if (matrixValue === 'string') {
    return [
      { name: 'a', company: ['a string', '@¯\\_(ツ)_/¯', '1number'] },
      { name: 'b', company: ['@¯\\_(ツ)_/¯'] },
      { name: 'c', company: ['another string'] },
      { name: 'd', company: ['1number'] },
      { name: 'e', company: ['something else'] },
      { name: 'f', company: [] },
      { name: 'g', company: [] },
    ]
  } else if (matrixValue === 'integer') {
    return [
      { name: 'a', company: [1, 2, 3] },
      { name: 'b', company: [2] },
      { name: 'c', company: [3] },
      { name: 'd', company: [4] },
      { name: 'e', company: [5] },
      { name: 'f', company: [] },
      { name: 'g', company: [] },
    ]
  }
}
