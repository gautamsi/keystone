
import { list } from '@keystone-6/core';
import { select,text,relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const CheckpointRestoreEvent: Lists.CheckpointRestoreEvent = list({
  access: allowAll,
  
  fields: {
    type: select({ options: [{ label: 'Checkpoint', value: 'checkpoint' },
{ label: 'Restore', value: 'restore' }],  }),
    reason: text({  }),
    metadata: text({  }),
    checkpoint: relationship({ ref: 'Checkpoint.events' }),
    run: relationship({ ref: 'TaskRun.checkpointRestoreEvent' }),
    attempt: relationship({ ref: 'TaskRunAttempt.checkpointRestoreEvent' }),
    project: relationship({ ref: 'Project.checkpointRestoreEvent' }),
    runtimeEnvironment: relationship({ ref: 'RuntimeEnvironment.checkpointRestoreEvent' }),
    taskRunDependency: relationship({ ref: 'TaskRunDependency.checkpointEvent' }),
    batchTaskRunDependency: relationship({ ref: 'BatchTaskRun.checkpointEvent' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } })
  }
});
