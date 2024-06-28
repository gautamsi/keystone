
import { list } from '@keystone-6/core';
import { text,timestamp,json,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const ProductType: Lists.ProductType = list({
  access: allowAll,
  
  fields: {
    value: text({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  }),
    metadata: json({  }),
    discountConditionProductType: relationship({ ref: 'DiscountConditionProductType.productType', many: true }),
    product: relationship({ ref: 'Product.productType', many: true }),
    productTypeTaxRate: relationship({ ref: 'ProductTypeTaxRate.productType', many: true })
  }
});
