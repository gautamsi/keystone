
import { list } from '@keystone-6/core';
import { text,select,relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const BatchTaskRun: Lists.BatchTaskRun = list({
  access: allowAll,
  
  fields: {
    friendlyId: text({  }),
    status: select({ options: [{ label: 'Pending', value: 'pending' },
{ label: 'Completed', value: 'completed' }], defaultValue: 'PENDING' }),
    idempotencyKey: text({  }),
    taskIdentifier: text({  }),
    checkpointEvent: relationship({ ref: 'CheckpointRestoreEvent.batchTaskRunDependency' }),
    runtimeEnvironment: relationship({ ref: 'RuntimeEnvironment.batchTaskRuns' }),
    dependentTaskAttempt: relationship({ ref: 'TaskRunAttempt.batchDependencies' }),
    items: relationship({ ref: 'BatchTaskRunItem.batchTaskRun', many: true }),
    runDependencies: relationship({ ref: 'TaskRunDependency.dependentBatchRun', many: true }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } })
  }
});
