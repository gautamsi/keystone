
import { list } from '@keystone-6/core';
import { relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const DiscountRuleProduct: Lists.DiscountRuleProduct = list({
  access: allowAll,
  
  fields: {
    discountRule: relationship({ ref: 'DiscountRule.discountRuleProducts' }),
    product: relationship({ ref: 'Product.discountRuleProducts' })
  }
});
