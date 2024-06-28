
import { list } from '@keystone-6/core';
import { integer,relationship,select,text,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const TaskAttempt: Lists.TaskAttempt = list({
  access: allowAll,
  
  fields: {
    number: integer({  }),
    task: relationship({ ref: 'Task.attempts' }),
    status: select({ options: [{ label: 'Pending', value: 'pending' },
      { label: 'Started', value: 'started' },
      { label: 'Completed', value: 'completed' },
      { label: 'Errored', value: 'errored' }], defaultValue: 'PENDING' }),
    error: text({  }),
    runAt: timestamp({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } })
  }
});
