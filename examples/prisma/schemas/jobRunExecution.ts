
import { list } from '@keystone-6/core';
import { relationship,integer,timestamp,text,select,checkbox } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const JobRunExecution: Lists.JobRunExecution = list({
  access: allowAll,
  
  fields: {
    run: relationship({ ref: 'JobRun.executions' }),
    retryCount: integer({ defaultValue: 0 }),
    retryLimit: integer({ defaultValue: 0 }),
    retryDelayInMs: integer({ defaultValue: 0 }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    startedAt: timestamp({  }),
    completedAt: timestamp({  }),
    error: text({  }),
    reason: select({ options: [{ label: 'Preprocess', value: 'preprocess' },
{ label: 'Execute Job', value: 'execute_job' }], defaultValue: 'EXECUTE_JOB' }),
    status: select({ options: [{ label: 'Pending', value: 'pending' },
{ label: 'Started', value: 'started' },
{ label: 'Success', value: 'success' },
{ label: 'Failure', value: 'failure' }], defaultValue: 'PENDING' }),
    resumeTask: relationship({ ref: 'Task.executions' }),
    graphileJobId: text({  }),
    isRetry: checkbox({ defaultValue: false })
  }
});
