
import { list } from '@keystone-6/core';
import { text, checkbox, select, relationship, timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const TaskSchedule: Lists.TaskSchedule = list({
  access: allowAll,
  
  fields: {
    friendlyId: text({  }),
    taskIdentifier: text({  }),
    deduplicationKey: text({ defaultValue: '[object Object]' }),
    userProvidedDeduplicationKey: checkbox({ defaultValue: false }),
    generatorExpression: text({  }),
    generatorDescription: text({ defaultValue: '' }),
    generatorType: select({ options: [{ label: 'Cron', value: 'cron' }], defaultValue: 'CRON' }),
    timezone: text({ defaultValue: 'UTC' }),
    externalId: text({  }),
    instances: relationship({ ref: 'TaskScheduleInstance.taskSchedule', many: true }),
    project: relationship({ ref: 'Project.taskSchedules' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    active: checkbox({ defaultValue: true }),
    runs: relationship({ ref: 'TaskRun.schedule', many: true })
  }
})
