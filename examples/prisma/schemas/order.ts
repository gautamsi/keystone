
import { list } from '@keystone-6/core';
import { select,integer,text,UNDEFINED__Float,timestamp,json,checkbox,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Order: Lists.Order = list({
  access: allowAll,
  
  fields: {
    status: select({ options: [{ label: 'Pending', value: 'pending' },
{ label: 'Completed', value: 'completed' },
{ label: 'Archived', value: 'archived' },
{ label: 'Canceled', value: 'canceled' },
{ label: 'Requires Action', value: 'requires_action' }], defaultValue: 'pending' }),
    fulfillmentStatus: select({ options: [{ label: 'Not Fulfilled', value: 'not_fulfilled' },
{ label: 'Partially Fulfilled', value: 'partially_fulfilled' },
{ label: 'Fulfilled', value: 'fulfilled' },
{ label: 'Partially Shipped', value: 'partially_shipped' },
{ label: 'Shipped', value: 'shipped' },
{ label: 'Partially Returned', value: 'partially_returned' },
{ label: 'Returned', value: 'returned' },
{ label: 'Canceled', value: 'canceled' },
{ label: 'Requires Action', value: 'requires_action' }], defaultValue: 'not_fulfilled' }),
    paymentStatus: select({ options: [{ label: 'Not Paid', value: 'not_paid' },
{ label: 'Awaiting', value: 'awaiting' },
{ label: 'Captured', value: 'captured' },
{ label: 'Partially Refunded', value: 'partially_refunded' },
{ label: 'Refunded', value: 'refunded' },
{ label: 'Canceled', value: 'canceled' },
{ label: 'Requires Action', value: 'requires_action' }], defaultValue: 'not_paid' }),
    displayId: integer({ defaultValue: [object Object] }),
    email: text({  }),
    taxRate: UNDEFINED__Float({  }),
    canceledAt: timestamp({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    metadata: json({  }),
    idempotencyKey: text({  }),
    noNotification: checkbox({  }),
    externalId: text({  }),
    addressAddressToorderShippingAddressId: relationship({ ref: 'Address.orderAddressToorderShippingAddressId' }),
    addressAddressToorderBillingAddressId: relationship({ ref: 'Address.orderAddressToorderBillingAddressId' }),
    currency: relationship({ ref: 'Currency.order' }),
    draftOrderDraftOrderToorderDraftOrderId: relationship({ ref: 'DraftOrder.orderDraftOrderToorderDraftOrderId' }),
    cart: relationship({ ref: 'Cart.order' }),
    customer: relationship({ ref: 'Customer.order' }),
    region: relationship({ ref: 'Region.order' }),
    claimOrder: relationship({ ref: 'ClaimOrder.order', many: true }),
    draftOrderDraftOrderOrderIdToorder: relationship({ ref: 'DraftOrder.orderDraftOrderOrderIdToorder' }),
    fulfillment: relationship({ ref: 'Fulfillment.order', many: true }),
    giftCard: relationship({ ref: 'GiftCard.order', many: true }),
    giftCardTransaction: relationship({ ref: 'GiftCardTransaction.order', many: true }),
    lineItem: relationship({ ref: 'LineItem.order', many: true }),
    orderDiscounts: relationship({ ref: 'OrderDiscount.order', many: true }),
    orderGiftCards: relationship({ ref: 'OrderGiftCard.order', many: true }),
    payment: relationship({ ref: 'Payment.order', many: true }),
    refund: relationship({ ref: 'Refund.order', many: true }),
    return: relationship({ ref: 'Renamedreturn.order', many: true }),
    shippingMethod: relationship({ ref: 'ShippingMethod.order', many: true }),
    swap: relationship({ ref: 'Swap.order', many: true })
  }
});
