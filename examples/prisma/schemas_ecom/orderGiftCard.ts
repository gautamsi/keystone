
import { list } from '@keystone-6/core';
import { relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const OrderGiftCard: Lists.OrderGiftCard = list({
  access: allowAll,
  
  fields: {
    order: relationship({ ref: 'Order.orderGiftCards' }),
    giftCard: relationship({ ref: 'GiftCard.orderGiftCards' })
  }
});
