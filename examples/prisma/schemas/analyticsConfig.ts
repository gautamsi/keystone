
import { list } from '@keystone-6/core';
import { timestamp,text,checkbox } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const AnalyticsConfig: Lists.AnalyticsConfig = list({
  access: allowAll,
  
  fields: {
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  }),
    userId: text({  }),
    optOut: checkbox({ defaultValue: false }),
    anonymize: checkbox({ defaultValue: false })
  }
});
