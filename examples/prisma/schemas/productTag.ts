
import { list } from '@keystone-6/core';
import { relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const ProductTag: Lists.ProductTag = list({
  access: allowAll,
  
  fields: {
    productTag: relationship({ ref: 'ProductTag.productTags' }),
    product: relationship({ ref: 'Product.productTags' })
  }
});
