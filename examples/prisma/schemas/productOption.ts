
import { list } from '@keystone-6/core';
import { text,timestamp,json,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const ProductOption: Lists.ProductOption = list({
  access: allowAll,
  
  fields: {
    title: text({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  }),
    metadata: json({  }),
    product: relationship({ ref: 'Product.productOption' }),
    productOptionValue: relationship({ ref: 'ProductOptionValue.productOption', many: true })
  }
});
