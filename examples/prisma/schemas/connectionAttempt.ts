
import { list } from '@keystone-6/core';
import { text,timestamp,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const ConnectionAttempt: Lists.ConnectionAttempt = list({
  access: allowAll,
  
  fields: {
    securityCode: text({  }),
    redirectTo: text({ defaultValue: '/' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    integration: relationship({ ref: 'Integration.attempts' })
  }
});
