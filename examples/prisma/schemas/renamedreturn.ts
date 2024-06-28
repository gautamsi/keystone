
import { list } from '@keystone-6/core';
import { select,json,integer,timestamp,text,checkbox,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Renamedreturn: Lists.Renamedreturn = list({
  access: allowAll,
  
  fields: {
    status: select({ options: [{ label: 'Requested', value: 'requested' },
{ label: 'Received', value: 'received' },
{ label: 'Requires Action', value: 'requires_action' },
{ label: 'Canceled', value: 'canceled' }], defaultValue: 'requested' }),
    shippingData: json({  }),
    refundAmount: integer({  }),
    receivedAt: timestamp({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    metadata: json({  }),
    idempotencyKey: text({  }),
    noNotification: checkbox({  }),
    claimOrder: relationship({ ref: 'ClaimOrder.return' }),
    swap: relationship({ ref: 'Swap.return' }),
    order: relationship({ ref: 'Order.return' }),
    returnItem: relationship({ ref: 'ReturnItem.return', many: true }),
    shippingMethod: relationship({ ref: 'ShippingMethod.return' })
  }
});
