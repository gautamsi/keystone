
import { list } from '@keystone-6/core';
import { text,relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const InvitationCode: Lists.InvitationCode = list({
  access: allowAll,
  
  fields: {
    code: text({  }),
    users: relationship({ ref: 'User.invitationCode', many: true }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } })
  }
});
