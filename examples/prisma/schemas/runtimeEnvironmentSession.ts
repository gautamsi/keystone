
import { list } from '@keystone-6/core';
import { text,relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const RuntimeEnvironmentSession: Lists.RuntimeEnvironmentSession = list({
  access: allowAll,
  
  fields: {
    ipAddress: text({  }),
    environment: relationship({ ref: 'RuntimeEnvironment.sessions' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    disconnectedAt: timestamp({  }),
    currentEnvironments: relationship({ ref: 'RuntimeEnvironment.currentSession', many: true })
  }
});
