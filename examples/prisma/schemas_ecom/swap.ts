
import { list } from '@keystone-6/core';
import { select,integer,timestamp,json,text,checkbox,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Swap: Lists.Swap = list({
  access: allowAll,
  
  fields: {
    fulfillmentStatus: select({ options: [{ label: 'Not Fulfilled', value: 'not_fulfilled' },
{ label: 'Fulfilled', value: 'fulfilled' },
{ label: 'Shipped', value: 'shipped' },
{ label: 'Partially Shipped', value: 'partially_shipped' },
{ label: 'Canceled', value: 'canceled' },
{ label: 'Requires Action', value: 'requires_action' }],  }),
    paymentStatus: select({ options: [{ label: 'Not Paid', value: 'not_paid' },
{ label: 'Awaiting', value: 'awaiting' },
{ label: 'Captured', value: 'captured' },
{ label: 'Confirmed', value: 'confirmed' },
{ label: 'Canceled', value: 'canceled' },
{ label: 'Difference Refunded', value: 'difference_refunded' },
{ label: 'Partially Refunded', value: 'partially_refunded' },
{ label: 'Refunded', value: 'refunded' },
{ label: 'Requires Action', value: 'requires_action' }],  }),
    differenceDue: integer({  }),
    confirmedAt: timestamp({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  }),
    metadata: json({  }),
    idempotencyKey: text({  }),
    noNotification: checkbox({  }),
    canceledAt: timestamp({  }),
    allowBackorder: checkbox({ defaultValue: false }),
    cart: relationship({ ref: 'Cart.swap' }),
    order: relationship({ ref: 'Order.swap' }),
    address: relationship({ ref: 'Address.swap' }),
    fulfillment: relationship({ ref: 'Fulfillment.swap', many: true }),
    lineItem: relationship({ ref: 'LineItem.swap', many: true }),
    payment: relationship({ ref: 'Payment.swap' }),
    return: relationship({ ref: 'Renamedreturn.swap' }),
    shippingMethod: relationship({ ref: 'ShippingMethod.swap', many: true })
  }
});
