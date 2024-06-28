
import { list } from '@keystone-6/core';
import { relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const CartDiscount: Lists.CartDiscount = list({
  access: allowAll,
  
  fields: {
    cart: relationship({ ref: 'Cart.cartDiscounts' }),
    discount: relationship({ ref: 'Discount.cartDiscounts' })
  }
});
