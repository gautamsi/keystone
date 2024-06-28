
import { list } from '@keystone-6/core';
import { text,checkbox,timestamp,json,integer,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Discount: Lists.Discount = list({
  access: allowAll,
  
  fields: {
    code: text({  }),
    isDynamic: checkbox({  }),
    isDisabled: checkbox({  }),
    startsAt: timestamp({  }),
    endsAt: timestamp({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  }),
    metadata: json({  }),
    usageLimit: integer({  }),
    usageCount: integer({ defaultValue: 0 }),
    validDuration: text({  }),
    discount: relationship({ ref: 'Discount.otherDiscount' }),
    discountRule: relationship({ ref: 'DiscountRule.discount' }),
    cartDiscounts: relationship({ ref: 'CartDiscount.discount', many: true }),
    otherDiscount: relationship({ ref: 'Discount.discount', many: true }),
    discountRegions: relationship({ ref: 'DiscountRegion.discount', many: true }),
    lineItemAdjustment: relationship({ ref: 'LineItemAdjustment.discount', many: true }),
    orderDiscounts: relationship({ ref: 'OrderDiscount.discount', many: true })
  }
});
