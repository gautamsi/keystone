
import { list } from '@keystone-6/core';
import { integer,text,select,checkbox,json,relationship,timestamp,UNDEFINED__Float } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const TaskRun: Lists.TaskRun = list({
  access: allowAll,
  
  fields: {
    number: integer({ defaultValue: 0 }),
    friendlyId: text({  }),
    status: select({ options: [{ label: 'Pending', value: 'pending' },
      { label: 'Waiting For Deploy', value: 'waiting_for_deploy' },
      { label: 'Executing', value: 'executing' },
      { label: 'Waiting To Resume', value: 'waiting_to_resume' },
      { label: 'Retrying After Failure', value: 'retrying_after_failure' },
      { label: 'Paused', value: 'paused' },
      { label: 'Canceled', value: 'canceled' },
      { label: 'Interrupted', value: 'interrupted' },
      { label: 'Completed Successfully', value: 'completed_successfully' },
      { label: 'Completed With Errors', value: 'completed_with_errors' },
      { label: 'System Failure', value: 'system_failure' },
      { label: 'Crashed', value: 'crashed' }], defaultValue: 'PENDING' }),
    idempotencyKey: text({  }),
    taskIdentifier: text({  }),
    isTest: checkbox({ defaultValue: false }),
    payload: text({  }),
    payloadType: text({ defaultValue: 'application/json' }),
    context: json({  }),
    traceContext: json({  }),
    traceId: text({  }),
    spanId: text({  }),
    runtimeEnvironment: relationship({ ref: 'RuntimeEnvironment.taskRuns' }),
    project: relationship({ ref: 'Project.taskRuns' }),
    queue: text({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    attempts: relationship({ ref: 'TaskRunAttempt.taskRun', many: true }),
    startedAt: timestamp({  }),
    machinePreset: text({  }),
    usageDurationMs: integer({ defaultValue: 0 }),
    costInCents: UNDEFINED__Float({  }),
    baseCostInCents: UNDEFINED__Float({  }),
    lockedAt: timestamp({  }),
    concurrencyKey: text({  }),
    dependency: relationship({ ref: 'TaskRunDependency.taskRun' }),
    scheduleInstance: relationship({ ref: 'TaskScheduleInstance.runs' }),
    schedule: relationship({ ref: 'TaskSchedule.runs' }),
  }
});
