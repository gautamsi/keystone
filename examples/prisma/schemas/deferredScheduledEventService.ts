
import { list } from '@keystone-6/core';
import { relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const DeferredScheduledEventService: Lists.DeferredScheduledEventService = list({
  access: allowAll,
  
  fields: {
    scheduleSource: relationship({ ref: 'ScheduleSource.deferredEvent' }),
    runAt: timestamp({  }),
    lastTimestamp: timestamp({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } })
  }
});
