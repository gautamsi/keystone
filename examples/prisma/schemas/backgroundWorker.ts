
import { list } from '@keystone-6/core';
import { text,relationship,json,timestamp,checkbox } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const BackgroundWorker: Lists.BackgroundWorker = list({
  access: allowAll,
  
  fields: {
    friendlyId: text({  }),
    contentHash: text({  }),
    sdkVersion: text({ defaultValue: 'unknown' }),
    cliVersion: text({ defaultValue: 'unknown' }),
    project: relationship({ ref: 'Project.backgroundWorkers' }),
    runtimeEnvironment: relationship({ ref: 'RuntimeEnvironment.backgroundWorkers' }),
    version: text({  }),
    metadata: json({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    tasks: relationship({ ref: 'BackgroundWorkerTask.worker', many: true }),
    attempts: relationship({ ref: 'TaskRunAttempt.backgroundWorker', many: true }),
    lockedRuns: relationship({ ref: 'TaskRun.lockedToVersion', many: true }),
    deployment: relationship({ ref: 'WorkerDeployment.worker' }),
    supportsLazyAttempts: checkbox({ defaultValue: false })
  }
});
