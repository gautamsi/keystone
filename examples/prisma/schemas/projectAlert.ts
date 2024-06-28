
import { list } from '@keystone-6/core';
import { text,relationship,select,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const ProjectAlert: Lists.ProjectAlert = list({
  access: allowAll,
  
  fields: {
    friendlyId: text({  }),
    project: relationship({ ref: 'Project.alerts' }),
    environment: relationship({ ref: 'RuntimeEnvironment.alerts' }),
    channel: relationship({ ref: 'ProjectAlertChannel.alerts' }),
    status: select({ options: [{ label: 'Pending', value: 'pending' },
{ label: 'Sent', value: 'sent' },
{ label: 'Failed', value: 'failed' }], defaultValue: 'PENDING' }),
    type: select({ options: [{ label: 'Task Run Attempt', value: 'task_run_attempt' },
{ label: 'Deployment Failure', value: 'deployment_failure' },
{ label: 'Deployment Success', value: 'deployment_success' }],  }),
    taskRunAttempt: relationship({ ref: 'TaskRunAttempt.alerts' }),
    workerDeployment: relationship({ ref: 'WorkerDeployment.alerts' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } })
  }
});
