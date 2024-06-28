
import { list } from '@keystone-6/core';
import { text,select,integer,checkbox,relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const RuntimeEnvironment: Lists.RuntimeEnvironment = list({
  access: allowAll,
  
  fields: {
    slug: text({  }),
    apiKey: text({  }),
    pkApiKey: text({  }),
    type: select({ options: [{ label: 'Production', value: 'production' },
{ label: 'Staging', value: 'staging' },
{ label: 'Development', value: 'development' },
{ label: 'Preview', value: 'preview' }], defaultValue: 'DEVELOPMENT' }),
    shortcode: text({  }),
    maximumConcurrencyLimit: integer({ defaultValue: 5 }),
    autoEnableInternalSources: checkbox({ defaultValue: true }),
    organization: relationship({ ref: 'Organization.environments' }),
    project: relationship({ ref: 'Project.environments' }),
    orgMember: relationship({ ref: 'OrgMember.environments' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    tunnelId: text({  }),
    endpoints: relationship({ ref: 'Endpoint.environment', many: true }),
    jobVersions: relationship({ ref: 'JobVersion.environment', many: true }),
    events: relationship({ ref: 'EventRecord.environment', many: true }),
    jobRuns: relationship({ ref: 'JobRun.environment', many: true }),
    requestDeliveries: relationship({ ref: 'HttpSourceRequestDelivery.environment', many: true }),
    jobAliases: relationship({ ref: 'JobAlias.environment', many: true }),
    jobQueue: relationship({ ref: 'JobQueue.environment', many: true }),
    sources: relationship({ ref: 'TriggerSource.environment', many: true }),
    eventDispatchers: relationship({ ref: 'EventDispatcher.environment', many: true }),
    scheduleSources: relationship({ ref: 'ScheduleSource.environment', many: true }),
    externalAccount: relationship({ ref: 'ExternalAccount.environment', many: true }),
    httpEndpointEnvironments: relationship({ ref: 'TriggerHttpEndpointEnvironment.environment', many: true }),
    concurrencyLimitGroups: relationship({ ref: 'ConcurrencyLimitGroup.environment', many: true }),
    keyValueItems: relationship({ ref: 'KeyValueItem.environment', many: true }),
    webhookEnvironments: relationship({ ref: 'WebhookEnvironment.environment', many: true }),
    webhookRequestDeliveries: relationship({ ref: 'WebhookRequestDelivery.environment', many: true }),
    backgroundWorkers: relationship({ ref: 'BackgroundWorker.runtimeEnvironment', many: true }),
    backgroundWorkerTasks: relationship({ ref: 'BackgroundWorkerTask.runtimeEnvironment', many: true }),
    taskRuns: relationship({ ref: 'TaskRun.runtimeEnvironment', many: true }),
    taskQueues: relationship({ ref: 'TaskQueue.runtimeEnvironment', many: true }),
    batchTaskRuns: relationship({ ref: 'BatchTaskRun.runtimeEnvironment', many: true }),
    environmentVariableValues: relationship({ ref: 'EnvironmentVariableValue.environment', many: true }),
    checkpoints: relationship({ ref: 'Checkpoint.runtimeEnvironment', many: true }),
    workerDeployments: relationship({ ref: 'WorkerDeployment.environment', many: true }),
    workerDeploymentPromotions: relationship({ ref: 'WorkerDeploymentPromotion.environment', many: true }),
    taskRunAttempts: relationship({ ref: 'TaskRunAttempt.runtimeEnvironment', many: true }),
    checkpointRestoreEvent: relationship({ ref: 'CheckpointRestoreEvent.runtimeEnvironment', many: true }),
    taskScheduleInstances: relationship({ ref: 'TaskScheduleInstance.environment', many: true }),
    alerts: relationship({ ref: 'ProjectAlert.environment', many: true }),
    sessions: relationship({ ref: 'RuntimeEnvironmentSession.environment', many: true }),
    currentSession: relationship({ ref: 'RuntimeEnvironmentSession.currentEnvironments' }),
    taskRunNumberCounter: relationship({ ref: 'TaskRunNumberCounter.environment', many: true })
  }
});
