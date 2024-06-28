
import { list } from '@keystone-6/core';
import { text,relationship,json,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const DynamicTriggerRegistration: Lists.DynamicTriggerRegistration = list({
  access: allowAll,
  
  fields: {
    key: text({  }),
    dynamicTrigger: relationship({ ref: 'DynamicTrigger.registrations' }),
    eventDispatcher: relationship({ ref: 'EventDispatcher.registrations' }),
    source: relationship({ ref: 'TriggerSource.registrations' }),
    metadata: json({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } })
  }
});
