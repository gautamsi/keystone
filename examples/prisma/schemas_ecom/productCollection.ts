
import { list } from '@keystone-6/core';
import { text,timestamp,json,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const ProductCollection: Lists.ProductCollection = list({
  access: allowAll,
  
  fields: {
    title: text({  }),
    handle: text({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  }),
    metadata: json({  }),
    discountConditionProductCollection: relationship({ ref: 'DiscountConditionProductCollection.productCollection', many: true }),
    product: relationship({ ref: 'Product.productCollection', many: true })
  }
});
