
import { list } from '@keystone-6/core';
import { select,timestamp,json,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const DiscountCondition: Lists.DiscountCondition = list({
  access: allowAll,
  
  fields: {
    type: select({ options: [{ label: 'Products', value: 'products' },
{ label: 'Product Types', value: 'product_types' },
{ label: 'Product Collections', value: 'product_collections' },
{ label: 'Product Tags', value: 'product_tags' },
{ label: 'Customer Groups', value: 'customer_groups' }],  }),
    operator: select({ options: [{ label: 'In', value: 'in' },
{ label: 'Not In', value: 'not_in' }],  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  }),
    metadata: json({  }),
    discountRule: relationship({ ref: 'DiscountRule.discountCondition' }),
    discountConditionCustomerGroup: relationship({ ref: 'DiscountConditionCustomerGroup.discountCondition', many: true }),
    discountConditionProduct: relationship({ ref: 'DiscountConditionProduct.discountCondition', many: true }),
    discountConditionProductCollection: relationship({ ref: 'DiscountConditionProductCollection.discountCondition', many: true }),
    discountConditionProductTag: relationship({ ref: 'DiscountConditionProductTag.discountCondition', many: true }),
    discountConditionProductType: relationship({ ref: 'DiscountConditionProductType.discountCondition', many: true })
  }
});
