
import { list } from '@keystone-6/core';
import { text,select,timestamp,checkbox,json,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Task: Lists.Task = list({
  access: allowAll,
  
  fields: {
    idempotencyKey: text({  }),
    displayKey: text({  }),
    name: text({  }),
    icon: text({  }),
    status: select({ options: [{ label: 'Pending', value: 'pending' },
{ label: 'Waiting', value: 'waiting' },
{ label: 'Running', value: 'running' },
{ label: 'Completed', value: 'completed' },
{ label: 'Errored', value: 'errored' },
{ label: 'Canceled', value: 'canceled' }], defaultValue: 'PENDING' }),
    delayUntil: timestamp({  }),
    noop: checkbox({ defaultValue: false }),
    description: text({  }),
    properties: json({  }),
    outputProperties: json({  }),
    params: json({  }),
    output: json({  }),
    outputIsUndefined: checkbox({ defaultValue: false }),
    context: json({  }),
    error: text({  }),
    redact: json({  }),
    style: json({  }),
    operation: text({  }),
    callbackUrl: text({  }),
    startedAt: timestamp({  }),
    completedAt: timestamp({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    run: relationship({ ref: 'JobRun.tasks' }),
    parent: relationship({ ref: 'Task.children' }),
    runConnection: relationship({ ref: 'RunConnection.tasks' }),
    children: relationship({ ref: 'Task.parent', many: true }),
    childExecutionMode: select({ options: [{ label: 'Sequential', value: 'sequential' },
{ label: 'Parallel', value: 'parallel' }], defaultValue: 'SEQUENTIAL' }),
    executions: relationship({ ref: 'JobRunExecution.resumeTask', many: true }),
    attempts: relationship({ ref: 'TaskAttempt.task', many: true })
  }
});
