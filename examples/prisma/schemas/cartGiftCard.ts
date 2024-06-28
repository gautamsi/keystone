
import { list } from '@keystone-6/core';
import { relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const CartGiftCard: Lists.CartGiftCard = list({
  access: allowAll,
  
  fields: {
    giftCard: relationship({ ref: 'GiftCard.cartGiftCards' }),
    cart: relationship({ ref: 'Cart.cartGiftCards' })
  }
});
