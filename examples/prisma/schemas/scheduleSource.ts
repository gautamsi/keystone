
import { list } from '@keystone-6/core';
import { text,json,relationship,timestamp,checkbox } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const ScheduleSource: Lists.ScheduleSource = list({
  access: allowAll,
  
  fields: {
    key: text({  }),
    schedule: json({  }),
    environment: relationship({ ref: 'RuntimeEnvironment.scheduleSources' }),
    dispatcher: relationship({ ref: 'EventDispatcher.scheduleSources' }),
    lastEventTimestamp: timestamp({  }),
    nextEventTimestamp: timestamp({  }),
    workerJobId: text({  }),
    active: checkbox({ defaultValue: false }),
    metadata: json({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    dynamicTrigger: relationship({ ref: 'DynamicTrigger.scheduleSources' }),
    externalAccount: relationship({ ref: 'ExternalAccount.schedules' }),
    deferredEvent: relationship({ ref: 'DeferredScheduledEventService.scheduleSource' })
  }
});
