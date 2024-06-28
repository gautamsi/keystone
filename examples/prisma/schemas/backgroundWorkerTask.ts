
import { list } from '@keystone-6/core';
import { text,relationship,timestamp,json,select } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const BackgroundWorkerTask: Lists.BackgroundWorkerTask = list({
  access: allowAll,
  
  fields: {
    slug: text({  }),
    friendlyId: text({  }),
    filePath: text({  }),
    exportName: text({  }),
    worker: relationship({ ref: 'BackgroundWorker.tasks' }),
    project: relationship({ ref: 'Project.backgroundWorkerTasks' }),
    runtimeEnvironment: relationship({ ref: 'RuntimeEnvironment.backgroundWorkerTasks' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    attempts: relationship({ ref: 'TaskRunAttempt.backgroundWorkerTask', many: true }),
    runs: relationship({ ref: 'TaskRun.lockedBy', many: true }),
    queueConfig: json({  }),
    retryConfig: json({  }),
    machineConfig: json({  }),
    triggerSource: select({ options: [{ label: 'Standard', value: 'standard' },
{ label: 'Scheduled', value: 'scheduled' }], defaultValue: 'STANDARD' })
  }
});
