
import { list } from '@keystone-6/core';
import { integer,text,select,timestamp,json,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Refund: Lists.Refund = list({
  access: allowAll,
  
  fields: {
    amount: integer({  }),
    note: text({  }),
    reason: select({ options: [{ label: 'Discount', value: 'discount' },
{ label: 'Return', value: 'return' },
{ label: 'Swap', value: 'swap' },
{ label: 'Claim', value: 'claim' },
{ label: 'Other', value: 'other' }],  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    metadata: json({  }),
    idempotencyKey: text({  }),
    order: relationship({ ref: 'Order.refund' })
  }
});
