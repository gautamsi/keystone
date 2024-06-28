
import { list } from '@keystone-6/core';
import { text,select,relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const OrgMemberInvite: Lists.OrgMemberInvite = list({
  access: allowAll,
  
  fields: {
    token: text({ defaultValue: '[object Object]' }),
    email: text({  }),
    role: select({ options: [{ label: 'Admin', value: 'admin' },
{ label: 'Member', value: 'member' }], defaultValue: 'MEMBER' }),
    organization: relationship({ ref: 'Organization.invites' }),
    inviter: relationship({ ref: 'User.sentInvites' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } })
  }
});
