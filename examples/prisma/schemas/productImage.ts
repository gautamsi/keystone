
import { list } from '@keystone-6/core';
import { relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const ProductImage: Lists.ProductImage = list({
  access: allowAll,
  
  fields: {
    image: relationship({ ref: 'Image.productImages' }),
    product: relationship({ ref: 'Product.productImages' })
  }
});
