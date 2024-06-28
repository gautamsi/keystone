
import { list } from '@keystone-6/core';
import { text,select,integer,timestamp,json,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const DiscountRule: Lists.DiscountRule = list({
  access: allowAll,
  
  fields: {
    description: text({  }),
    type: select({ options: [{ label: 'Fixed', value: 'fixed' },
{ label: 'Percentage', value: 'percentage' },
{ label: 'Free Shipping', value: 'free_shipping' }],  }),
    value: integer({  }),
    allocation: select({ options: [{ label: 'Total', value: 'total' },
{ label: 'Item', value: 'item' }],  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  }),
    metadata: json({  }),
    discount: relationship({ ref: 'Discount.discountRule', many: true }),
    discountCondition: relationship({ ref: 'DiscountCondition.discountRule', many: true }),
    discountRuleProducts: relationship({ ref: 'DiscountRuleProduct.discountRule', many: true })
  }
});
