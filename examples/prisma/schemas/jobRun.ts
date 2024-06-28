
import { list } from '@keystone-6/core';
import { integer,checkbox,relationship,timestamp,json,select,text } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const JobRun: Lists.JobRun = list({
  access: allowAll,
  
  fields: {
    number: integer({  }),
    internal: checkbox({ defaultValue: false }),
    job: relationship({ ref: 'Job.runs' }),
    version: relationship({ ref: 'JobVersion.runs' }),
    event: relationship({ ref: 'EventRecord.runs' }),
    organization: relationship({ ref: 'Organization.jobRuns' }),
    endpoint: relationship({ ref: 'Endpoint.jobRuns' }),
    environment: relationship({ ref: 'RuntimeEnvironment.jobRuns' }),
    project: relationship({ ref: 'Project.runs' }),
    queue: relationship({ ref: 'JobQueue.runs' }),
    externalAccount: relationship({ ref: 'ExternalAccount.runs' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    queuedAt: timestamp({  }),
    startedAt: timestamp({  }),
    completedAt: timestamp({  }),
    properties: json({  }),
    status: select({ options: [{ label: 'Pending', value: 'pending' },
      { label: 'Queued', value: 'queued' },
      { label: 'Waiting On Connections', value: 'waiting_on_connections' },
      { label: 'Preprocessing', value: 'preprocessing' },
      { label: 'Started', value: 'started' },
      { label: 'Executing', value: 'executing' },
      { label: 'Waiting To Continue', value: 'waiting_to_continue' },
      { label: 'Waiting To Execute', value: 'waiting_to_execute' },
      { label: 'Success', value: 'success' },
      { label: 'Failure', value: 'failure' },
      { label: 'Timed Out', value: 'timed_out' },
      { label: 'Aborted', value: 'aborted' },
      { label: 'Canceled', value: 'canceled' },
      { label: 'Unresolved Auth', value: 'unresolved_auth' },
      { label: 'Invalid Payload', value: 'invalid_payload' }], defaultValue: 'PENDING' }),
    output: json({  }),
    timedOutAt: timestamp({  }),
    timedOutReason: text({  }),
    executionCount: integer({ defaultValue: 0 }),
    executionFailureCount: integer({ defaultValue: 0 }),
    executionDuration: integer({ defaultValue: 0 }),
    isTest: checkbox({ defaultValue: false }),
    preprocess: checkbox({ defaultValue: false }),
    yieldedExecutions: text({  }),
    forceYieldImmediately: checkbox({ defaultValue: false }),
    tasks: relationship({ ref: 'Task.run', many: true }),
    runConnections: relationship({ ref: 'RunConnection.run', many: true }),
    missingConnections: relationship({ ref: 'MissingConnection.runs', many: true }),
    executions: relationship({ ref: 'JobRunExecution.run', many: true }),
    statuses: relationship({ ref: 'JobRunStatusRecord.run', many: true }),
    autoYieldExecution: relationship({ ref: 'JobRunAutoYieldExecution.run', many: true }),
    subscriptions: relationship({ ref: 'JobRunSubscription.run', many: true })
  }
});
