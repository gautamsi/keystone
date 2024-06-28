
import { list } from '@keystone-6/core';
import { select,integer,timestamp,json,text,checkbox,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const ClaimOrder: Lists.ClaimOrder = list({
  access: allowAll,
  
  fields: {
    paymentStatus: select({ options: [{ label: 'Na', value: 'na' },
{ label: 'Not Refunded', value: 'not_refunded' },
{ label: 'Refunded', value: 'refunded' }], defaultValue: 'na' }),
    fulfillmentStatus: select({ options: [{ label: 'Not Fulfilled', value: 'not_fulfilled' },
{ label: 'Partially Fulfilled', value: 'partially_fulfilled' },
{ label: 'Fulfilled', value: 'fulfilled' },
{ label: 'Partially Shipped', value: 'partially_shipped' },
{ label: 'Shipped', value: 'shipped' },
{ label: 'Partially Returned', value: 'partially_returned' },
{ label: 'Returned', value: 'returned' },
{ label: 'Canceled', value: 'canceled' },
{ label: 'Requires Action', value: 'requires_action' }], defaultValue: 'not_fulfilled' }),
    type: select({ options: [{ label: 'Refund', value: 'refund' },
{ label: 'Replace', value: 'replace' }],  }),
    refundAmount: integer({  }),
    canceledAt: timestamp({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  }),
    metadata: json({  }),
    idempotencyKey: text({  }),
    noNotification: checkbox({  }),
    address: relationship({ ref: 'Address.claimOrder' }),
    order: relationship({ ref: 'Order.claimOrder' }),
    claimItem: relationship({ ref: 'ClaimItem.claimOrder', many: true }),
    fulfillment: relationship({ ref: 'Fulfillment.claimOrder', many: true }),
    lineItem: relationship({ ref: 'LineItem.claimOrder', many: true }),
    return: relationship({ ref: 'Renamedreturn.claimOrder' }),
    shippingMethod: relationship({ ref: 'ShippingMethod.claimOrder', many: true })
  }
});
