
import { list } from '@keystone-6/core';
import { select,relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const BatchTaskRunItem: Lists.BatchTaskRunItem = list({
  access: allowAll,
  
  fields: {
    status: select({ options: [{ label: 'Pending', value: 'pending' },
{ label: 'Failed', value: 'failed' },
{ label: 'Canceled', value: 'canceled' },
{ label: 'Completed', value: 'completed' }], defaultValue: 'PENDING' }),
    batchTaskRun: relationship({ ref: 'BatchTaskRun.items' }),
    taskRun: relationship({ ref: 'TaskRun.batchItems' }),
    taskRunAttempt: relationship({ ref: 'TaskRunAttempt.batchTaskRunItems' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } })
  }
});
