import { list } from '@keystone-6/core'
import { allowAll, denyAll } from '@keystone-6/core/access'
import { text, checkbox, password, timestamp, relationship, json, select, integer } from '@keystone-6/core/fields'
import type { Lists } from '.keystone/types'

// WARNING: this example is for demonstration purposes only
//   as with each of our examples, it has not been vetted
//   or tested for any particular usage

export type Session = {
  itemId: string
  data: {
    isAdmin: boolean
  }
}

function hasSession({ session }: { session?: Session }) {
  return Boolean(session)
}

function isAdminOrSameUser({ session, item }: { session?: Session; item: Lists.User.Item | null }) {
  // you need to have a session to do this
  if (!session) return false

  // admins can do anything
  if (session.data.isAdmin) return true

  // no item? then no
  if (!item) return false

  // the authenticated user needs to be equal to the user we are updating
  return session.itemId === item.id
}

function isAdminOrSameUserFilter({ session }: { session?: Session }) {
  // you need to have a session to do this
  if (!session) return false

  // admins can see everything
  if (session.data?.isAdmin) return {}

  // only yourself
  return {
    id: {
      equals: session.itemId,
    },
  }
}

function isAdmin({ session }: { session?: Session }) {
  // you need to have a session to do this
  if (!session) return false

  // admins can do anything
  if (session.data.isAdmin) return true

  // otherwise, no
  return false
}

export const lists = {
  User: list({
    access: {
      operation: {
        create: allowAll,
        query: allowAll,

        // what a user can update is limited by
        //   the access.filter.* and access.item.* access controls
        update: hasSession,

        // only admins can delete users
        delete: isAdmin,
      },
      filter: {
        update: isAdminOrSameUserFilter,
      },
      item: {
        // this is redundant as ^filter.update should stop unauthorised updates
        //   we include it anyway as a demonstration
        update: isAdminOrSameUser,
      },
    },
    ui: {
      // only show deletion options for admins
      hideDelete: args => !isAdmin(args),
      listView: {
        // the default columns that will be displayed in the list view
        initialColumns: ['name', 'isAdmin'],
      },
    },
    fields: {
      // the user's name, used as the identity field for authentication
      //   should not be publicly visible
      //
      //   we use isIndexed to enforce names are unique
      //     that may not be suitable for your application
      name: text({
        access: {
          // only the respective user, or an admin can read this field
          read: isAdminOrSameUser,

          // only admins can update this field
          update: isAdmin,
        },
        isFilterable: false,
        isOrderable: false,
        isIndexed: 'unique',
        validation: {
          isRequired: true,
        },
      }),

      // the user's password, used as the secret field for authentication
      //   should not be publicly visible
      password: password({
        access: {
          read: denyAll, // TODO: is this required?
          update: isAdminOrSameUser,
        },
        validation: {
          isRequired: true,
        },
        ui: {
          itemView: {
            // don't show this field if it isn't relevant
            fieldMode: args => (isAdminOrSameUser(args) ? 'edit' : 'hidden'),
          },
          listView: {
            fieldMode: 'hidden', // TODO: is this required?
          },
        },
      }),

      // a flag to indicate if this user is an admin
      //  should not be publicly visible
      isAdmin: checkbox({
        access: {
          // only the respective user, or an admin can read this field
          read: isAdminOrSameUser,

          // only admins can create, or update this field
          create: isAdmin,
          update: isAdmin,
        },
        defaultValue: false,
        ui: {
          // only admins can edit this field
          createView: {
            fieldMode: args => (isAdmin(args) ? 'edit' : 'hidden'),
          },
          itemView: {
            fieldMode: args => (isAdmin(args) ? 'edit' : 'read'),
          },
        },
      }),
    },
  }),
  Project: list({
    access: allowAll,

    fields: {
      slug: text({ isIndexed: 'unique' }),
      name: text({ validation: { isRequired: true } }),
      createdAt: timestamp({ defaultValue: { kind: 'now' } }),
      updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
      deletedAt: timestamp({}),
      taskRuns: relationship({ ref: 'TaskRun.project', many: true }),
    }
  }),
  TaskRun: list({
    access: allowAll,

    fields: {
      number: integer({ defaultValue: 0 }),
      friendlyId: text({}),
      status: select({
        options: [
          { label: 'Pending', value: 'pending' },
          { label: 'Executing', value: 'executing' },
          { label: 'Paused', value: 'paused' },
          { label: 'Canceled', value: 'canceled' },
          { label: 'Interrupted', value: 'interrupted' },
          { label: 'Completed Successfully', value: 'completed_successfully' },
          { label: 'Completed With Errors', value: 'completed_with_errors' },
          { label: 'System Failure', value: 'system_failure' },
          { label: 'Crashed', value: 'crashed' }],
        defaultValue: 'pending'
      }),
      taskIdentifier: text({}),
      isTest: checkbox({ defaultValue: false }),
      payload: text({}),
      payloadType: text({ defaultValue: 'application/json' }),
      context: json({}),
      traceId: text({}),
      spanId: text({}),
      project: relationship({ ref: 'Project.taskRuns' }),
      createdAt: timestamp({ defaultValue: { kind: 'now' } }),
      updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
      attempts: relationship({ ref: 'TaskRunAttempt.taskRun', many: true }),
      startedAt: timestamp({}),
      completedAt: timestamp({}),
    }
  }),
  TaskRunAttempt: list({
    access: allowAll,

    fields: {
      number: integer({ defaultValue: 0 }),
      friendlyId: text({}),
      taskRun: relationship({ ref: 'TaskRun.attempts' }),
      status: select({
        options: [
          { label: 'Pending', value: 'pending' },
          { label: 'Executing', value: 'executing' },
          { label: 'Paused', value: 'paused' },
          { label: 'Failed', value: 'failed' },
          { label: 'Canceled', value: 'canceled' },
          { label: 'Completed', value: 'completed' }],
        defaultValue: 'pending'
      }),
      createdAt: timestamp({ defaultValue: { kind: 'now' } }),
      updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
      startedAt: timestamp({}),
      completedAt: timestamp({}),
      error: json({}),
      output: text({}),
      outputType: text({ defaultValue: 'application/json' }),
    }
  })
} satisfies Lists<Session>
