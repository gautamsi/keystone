
import { list } from '@keystone-6/core';
import { text,json,checkbox,timestamp,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const EventDispatcher: Lists.EventDispatcher = list({
  access: allowAll,
  
  fields: {
    event: text({  }),
    source: text({  }),
    payloadFilter: json({  }),
    contextFilter: json({  }),
    manual: checkbox({ defaultValue: false }),
    dispatchableId: text({  }),
    dispatchable: json({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    enabled: checkbox({ defaultValue: true }),
    environment: relationship({ ref: 'RuntimeEnvironment.eventDispatchers' }),
    registrations: relationship({ ref: 'DynamicTriggerRegistration.eventDispatcher', many: true }),
    scheduleSources: relationship({ ref: 'ScheduleSource.dispatcher', many: true }),
    externalAccount: relationship({ ref: 'ExternalAccount.eventDispatcher' })
  }
});
