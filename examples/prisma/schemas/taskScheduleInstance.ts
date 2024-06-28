
import { list } from '@keystone-6/core';
import { relationship,timestamp,checkbox } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const TaskScheduleInstance: Lists.TaskScheduleInstance = list({
  access: allowAll,
  
  fields: {
    taskSchedule: relationship({ ref: 'TaskSchedule.instances' }),
    environment: relationship({ ref: 'RuntimeEnvironment.taskScheduleInstances' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    active: checkbox({ defaultValue: true }),
    lastScheduledTimestamp: timestamp({  }),
    nextScheduledTimestamp: timestamp({  }),
    runs: relationship({ ref: 'TaskRun.scheduleInstance', many: true })
  }
});
