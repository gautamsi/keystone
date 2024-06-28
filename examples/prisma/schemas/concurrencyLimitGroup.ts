
import { list } from '@keystone-6/core';
import { text,integer,relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const ConcurrencyLimitGroup: Lists.ConcurrencyLimitGroup = list({
  access: allowAll,
  
  fields: {
    name: text({  }),
    concurrencyLimit: integer({  }),
    environment: relationship({ ref: 'RuntimeEnvironment.concurrencyLimitGroups' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    jobVersion: relationship({ ref: 'JobVersion.concurrencyLimitGroup', many: true })
  }
});
