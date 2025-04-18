import { gen, sampleOne } from 'testcheck'
import { text, relationship } from '@keystone-6/core/fields'
import { list } from '@keystone-6/core'
import { setupTestRunner } from '@keystone-6/api-tests/test-runner'
import { allOperations, allowAll } from '@keystone-6/core/access'
import { expectGraphQLValidationError } from '../../utils'

const alphanumGenerator = gen.alphaNumString.notEmpty()

const runner = setupTestRunner({
  serve: true,
  config: {
    lists: {
      Group: list({
        access: allowAll,
        fields: {
          name: text(),
        },
      }),
      Event: list({
        access: allowAll,
        fields: {
          title: text(),
          group: relationship({ ref: 'Group' }),
        },
      }),
      GroupNoRead: list({
        access: {
          operation: { ...allOperations(allowAll), query: () => false },
        },
        fields: {
          name: text(),
        },
      }),
      EventToGroupNoRead: list({
        access: allowAll,
        fields: {
          title: text(),
          group: relationship({ ref: 'GroupNoRead' }),
        },
      }),
    },
  },
})

describe('no access control', () => {
  test(
    'removes item from list',
    runner(async ({ context }) => {
      const groupName = `foo${sampleOne(alphanumGenerator)}`

      const createGroup = await context.query.Group.createOne({ data: { name: groupName } })

      // Create an item to update
      const createEvent = await context.query.Event.createOne({
        data: { title: 'A thing', group: { connect: { id: createGroup.id } } },
        query: 'id group { id }',
      })

      // Avoid false-positives by checking the database directly
      expect(createEvent).toHaveProperty('group')
      expect(createEvent.group.id.toString()).toBe(createGroup.id)

      // Update the item and link the relationship field
      const event = await context.query.Event.updateOne({
        where: { id: createEvent.id },
        data: { group: { disconnect: true } },
        query: 'id group { id }',
      })

      expect(event).toMatchObject({ id: expect.any(String), group: null })

      // Avoid false-positives by checking the database directly
      const eventData = await context.query.Event.findOne({
        where: { id: createEvent.id },
        query: 'id group { id }',
      })

      expect(eventData).toHaveProperty('group', null)
    })
  )

  test(
    'causes a validation error if used during create',
    runner(async ({ gqlSuper }) => {
      const { body } = await gqlSuper({
        query: `
          mutation {
            createEvent(data: { group: { disconnect: true } }) {
              id
              group {
                id
              }
            }
          }
        `,
      }).expect(400)
      expectGraphQLValidationError(body.errors, [
        {
          message: `Field "disconnect" is not defined by type "GroupRelateToOneForCreateInput". Did you mean "connect"?`,
        },
      ])
    })
  )

  test(
    'silently succeeds if no item to disconnect during update',
    runner(async ({ context }) => {
      // Create an item to link against
      const createEvent = await context.query.Event.createOne({ data: {} })

      // Create an item that does the linking
      const event = await context.query.Event.updateOne({
        where: { id: createEvent.id },
        data: { group: { disconnect: true } },
        query: 'id group { id }',
      })

      expect(event).toMatchObject({ id: expect.any(String), group: null })
    })
  )
})

describe('with access control', () => {
  describe('read: false on related list', () => {
    test(
      'has no effect when using disconnect: true',
      runner(async ({ context }) => {
        const groupName = sampleOne(alphanumGenerator)

        // Create an item to link against
        const createGroup = await context.sudo().query.GroupNoRead.createOne({
          data: { name: groupName },
        })

        // Create an item to update
        const createEvent = await context.sudo().query.EventToGroupNoRead.createOne({
          data: { group: { connect: { id: createGroup.id } } },
          query: 'id group { id }',
        })

        // Avoid false-positives by checking the database directly
        expect(createEvent).toHaveProperty('group')
        expect(createEvent.group.id.toString()).toBe(createGroup.id)

        // Update the item and link the relationship field
        await context.query.EventToGroupNoRead.updateOne({
          where: { id: createEvent.id },
          data: { group: { disconnect: true } },
        })

        // Avoid false-positives by checking the database directly
        const eventData = await context.sudo().query.EventToGroupNoRead.findOne({
          where: { id: createEvent.id },
          query: 'id group { id }',
        })

        expect(eventData).toHaveProperty('group')
        expect(eventData!.group).toBe(null)
      })
    )
  })
})
