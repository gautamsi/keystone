
import { list } from '@keystone-6/core';
import { text,relationship,timestamp,select } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Project: Lists.Project = list({
  access: allowAll,
  
  fields: {
    slug: text({  }),
    name: text({  }),
    externalRef: text({  }),
    organization: relationship({ ref: 'Organization.projects' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  }),
    version: select({ options: [{ label: 'V2', value: 'v2' },
{ label: 'V3', value: 'v3' }], defaultValue: 'V2' }),
    environments: relationship({ ref: 'RuntimeEnvironment.project', many: true }),
    endpoints: relationship({ ref: 'Endpoint.project', many: true }),
    jobs: relationship({ ref: 'Job.project', many: true }),
    jobVersion: relationship({ ref: 'JobVersion.project', many: true }),
    events: relationship({ ref: 'EventRecord.project', many: true }),
    runs: relationship({ ref: 'JobRun.project', many: true }),
    sources: relationship({ ref: 'TriggerSource.project', many: true }),
    httpEndpoints: relationship({ ref: 'TriggerHttpEndpoint.project', many: true }),
    webhooks: relationship({ ref: 'Webhook.project', many: true }),
    backgroundWorkers: relationship({ ref: 'BackgroundWorker.project', many: true }),
    backgroundWorkerTasks: relationship({ ref: 'BackgroundWorkerTask.project', many: true }),
    taskRuns: relationship({ ref: 'TaskRun.project', many: true }),
    taskTags: relationship({ ref: 'TaskTag.project', many: true }),
    taskQueues: relationship({ ref: 'TaskQueue.project', many: true }),
    environmentVariables: relationship({ ref: 'EnvironmentVariable.project', many: true }),
    checkpoints: relationship({ ref: 'Checkpoint.project', many: true }),
    workerDeployment: relationship({ ref: 'WorkerDeployment.project', many: true }),
    checkpointRestoreEvent: relationship({ ref: 'CheckpointRestoreEvent.project', many: true }),
    taskSchedules: relationship({ ref: 'TaskSchedule.project', many: true }),
    alertChannels: relationship({ ref: 'ProjectAlertChannel.project', many: true }),
    alerts: relationship({ ref: 'ProjectAlert.project', many: true }),
    alertStorages: relationship({ ref: 'ProjectAlertStorage.project', many: true }),
    bulkActionGroups: relationship({ ref: 'BulkActionGroup.project', many: true })
  }
});
