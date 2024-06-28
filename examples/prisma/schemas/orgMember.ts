
import { list } from '@keystone-6/core';
import { relationship,select,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const OrgMember: Lists.OrgMember = list({
  access: allowAll,
  
  fields: {
    organization: relationship({ ref: 'Organization.members' }),
    user: relationship({ ref: 'User.orgMemberships' }),
    role: select({ options: [{ label: 'Admin', value: 'admin' },
{ label: 'Member', value: 'member' }], defaultValue: 'MEMBER' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    environments: relationship({ ref: 'RuntimeEnvironment.orgMember', many: true })
  }
});
