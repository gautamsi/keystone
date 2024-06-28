
import { list } from '@keystone-6/core';
import { text,checkbox,integer,timestamp,json,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const LineItem: Lists.LineItem = list({
  access: allowAll,
  
  fields: {
    title: text({  }),
    description: text({  }),
    thumbnail: text({  }),
    isGiftcard: checkbox({ defaultValue: false }),
    shouldMerge: checkbox({ defaultValue: true }),
    allowDiscounts: checkbox({ defaultValue: true }),
    hasShipping: checkbox({  }),
    unitPrice: integer({  }),
    quantity: integer({  }),
    fulfilledQuantity: integer({  }),
    returnedQuantity: integer({  }),
    shippedQuantity: integer({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    metadata: json({  }),
    isReturn: checkbox({ defaultValue: false }),
    claimOrder: relationship({ ref: 'ClaimOrder.lineItem' }),
    cart: relationship({ ref: 'Cart.lineItem' }),
    swap: relationship({ ref: 'Swap.lineItem' }),
    order: relationship({ ref: 'Order.lineItem' }),
    productVariant: relationship({ ref: 'ProductVariant.lineItem' }),
    claimItem: relationship({ ref: 'ClaimItem.lineItem', many: true }),
    fulfillmentItem: relationship({ ref: 'FulfillmentItem.lineItem', many: true }),
    lineItemAdjustment: relationship({ ref: 'LineItemAdjustment.lineItem', many: true }),
    lineItemTaxLine: relationship({ ref: 'LineItemTaxLine.lineItem', many: true }),
    returnItem: relationship({ ref: 'ReturnItem.lineItem', many: true })
  }
});
