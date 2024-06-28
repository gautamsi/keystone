
import { list } from '@keystone-6/core';
import { integer,text,relationship,select,timestamp,json } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const TaskRunAttempt: Lists.TaskRunAttempt = list({
  access: allowAll,
  
  fields: {
    number: integer({ defaultValue: 0 }),
    friendlyId: text({  }),
    taskRun: relationship({ ref: 'TaskRun.attempts' }),
    backgroundWorker: relationship({ ref: 'BackgroundWorker.attempts' }),
    backgroundWorkerTask: relationship({ ref: 'BackgroundWorkerTask.attempts' }),
    runtimeEnvironment: relationship({ ref: 'RuntimeEnvironment.taskRunAttempts' }),
    queue: relationship({ ref: 'TaskQueue.attempts' }),
    status: select({ options: [{ label: 'Pending', value: 'pending' },
      { label: 'Executing', value: 'executing' },
      { label: 'Paused', value: 'paused' },
      { label: 'Failed', value: 'failed' },
      { label: 'Canceled', value: 'canceled' },
      { label: 'Completed', value: 'completed' }], defaultValue: 'PENDING' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    startedAt: timestamp({  }),
    completedAt: timestamp({  }),
    usageDurationMs: integer({ defaultValue: 0 }),
    error: json({  }),
    output: text({  }),
    outputType: text({ defaultValue: 'application/json' }),
    dependencies: relationship({ ref: 'TaskRunDependency.dependentAttempt', many: true }),
    batchDependencies: relationship({ ref: 'BatchTaskRun.dependentTaskAttempt', many: true }),
    checkpoints: relationship({ ref: 'Checkpoint.attempt', many: true }),
    batchTaskRunItems: relationship({ ref: 'BatchTaskRunItem.taskRunAttempt', many: true }),
    checkpointRestoreEvent: relationship({ ref: 'CheckpointRestoreEvent.attempt', many: true }),
    alerts: relationship({ ref: 'ProjectAlert.taskRunAttempt', many: true })
  }
});
