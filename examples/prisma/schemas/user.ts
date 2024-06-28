
import { list } from '@keystone-6/core';
import { text, timestamp, json, select, relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const User: Lists.User = list({
  access: allowAll,

  fields: {
    email: text({}),
    firstName: text({}),
    lastName: text({}),
    passwordHash: text({}),
    apiToken: text({}),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({}),
    metadata: json({}),
    role: select({
      options: [{ label: 'Admin', value: 'admin' },
      { label: 'Member', value: 'member' },
      { label: 'Developer', value: 'developer' }], defaultValue: 'member'
    }),
    batchJob: relationship({ ref: 'BatchJob.user', many: true })
  }
});
