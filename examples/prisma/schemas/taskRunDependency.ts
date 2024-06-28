
import { list } from '@keystone-6/core';
import { relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const TaskRunDependency: Lists.TaskRunDependency = list({
  access: allowAll,
  
  fields: {
    taskRun: relationship({ ref: 'TaskRun.dependency' }),
    checkpointEvent: relationship({ ref: 'CheckpointRestoreEvent.taskRunDependency' }),
    dependentAttempt: relationship({ ref: 'TaskRunAttempt.dependencies' }),
    dependentBatchRun: relationship({ ref: 'BatchTaskRun.runDependencies' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } })
  }
});
