
import { list } from '@keystone-6/core';
import { text,select,checkbox,timestamp,json } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Invite: Lists.Invite = list({
  access: allowAll,
  
  fields: {
    userEmail: text({  }),
    role: select({ options: [{ label: 'Admin', value: 'admin' },
{ label: 'Member', value: 'member' },
{ label: 'Developer', value: 'developer' }], defaultValue: 'member' }),
    accepted: checkbox({ defaultValue: false }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  }),
    metadata: json({  }),
    token: text({  }),
    expiresAt: timestamp({  })
  }
});
