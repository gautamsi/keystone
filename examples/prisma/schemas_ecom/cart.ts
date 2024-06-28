
import { list } from '@keystone-6/core';
import { text,select,timestamp,json,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Cart: Lists.Cart = list({
  access: allowAll,
  
  fields: {
    email: text({  }),
    type: select({ options: [{ label: 'Default', value: 'default' },
{ label: 'Swap', value: 'swap' },
{ label: 'Draft Order', value: 'draft_order' },
{ label: 'Payment Link', value: 'payment_link' },
{ label: 'Claim', value: 'claim' }], defaultValue: 'default' }),
    completedAt: timestamp({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  }),
    metadata: json({  }),
    idempotencyKey: text({  }),
    context: json({  }),
    paymentAuthorizedAt: timestamp({  }),
    customer: relationship({ ref: 'Customer.cart' }),
    region: relationship({ ref: 'Region.cart' }),
    addressAddressTocartBillingAddressId: relationship({ ref: 'Address.cartAddressTocartBillingAddressId' }),
    paymentCartPaymentIdTopayment: relationship({ ref: 'Payment.cartCartPaymentIdTopayment' }),
    addressAddressTocartShippingAddressId: relationship({ ref: 'Address.cartAddressTocartShippingAddressId' }),
    cartDiscounts: relationship({ ref: 'CartDiscount.cart', many: true }),
    cartGiftCards: relationship({ ref: 'CartGiftCard.cart', many: true }),
    customShippingOption: relationship({ ref: 'CustomShippingOption.cart', many: true }),
    draftOrder: relationship({ ref: 'DraftOrder.cart' }),
    lineItem: relationship({ ref: 'LineItem.cart', many: true }),
    order: relationship({ ref: 'Order.cart' }),
    paymentCartTopaymentCartId: relationship({ ref: 'Payment.cartCartTopaymentCartId', many: true }),
    paymentSession: relationship({ ref: 'PaymentSession.cart', many: true }),
    shippingMethod: relationship({ ref: 'ShippingMethod.cart', many: true }),
    swap: relationship({ ref: 'Swap.cart' })
  }
});
