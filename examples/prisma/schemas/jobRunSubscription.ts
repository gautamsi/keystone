
import { list } from '@keystone-6/core';
import { relationship,text,select,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const JobRunSubscription: Lists.JobRunSubscription = list({
  access: allowAll,
  
  fields: {
    run: relationship({ ref: 'JobRun.subscriptions' }),
    recipient: text({  }),
    recipientMethod: select({ options: [{ label: 'Webhook', value: 'webhook' },
{ label: 'Endpoint', value: 'endpoint' }], defaultValue: 'WEBHOOK' }),
    event: select({ options: [{ label: 'Success', value: 'success' },
{ label: 'Failure', value: 'failure' }],  }),
    status: select({ options: [{ label: 'Active', value: 'active' },
{ label: 'Inactive', value: 'inactive' }], defaultValue: 'ACTIVE' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deliveredAt: timestamp({  })
  }
});
