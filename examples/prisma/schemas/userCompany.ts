
import { list } from '@keystone-6/core';
import { timestamp,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const UserCompany: Lists.UserCompany = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'BigInt' } },
  fields: {
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    company: relationship({ ref: 'Company.userCompany' }),
    user: relationship({ ref: 'User.userCompany' })
  }
});
