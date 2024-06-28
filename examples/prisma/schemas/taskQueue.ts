
import { list } from '@keystone-6/core';
import { text,select,relationship,integer,json,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const TaskQueue: Lists.TaskQueue = list({
  access: allowAll,
  
  fields: {
    friendlyId: text({  }),
    name: text({  }),
    type: select({ options: [{ label: 'Virtual', value: 'virtual' },
{ label: 'Named', value: 'named' }], defaultValue: 'VIRTUAL' }),
    project: relationship({ ref: 'Project.taskQueues' }),
    runtimeEnvironment: relationship({ ref: 'RuntimeEnvironment.taskQueues' }),
    concurrencyLimit: integer({  }),
    rateLimit: json({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    attempts: relationship({ ref: 'TaskRunAttempt.queue', many: true })
  }
});
