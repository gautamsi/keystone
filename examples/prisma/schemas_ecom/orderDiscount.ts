
import { list } from '@keystone-6/core';
import { relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const OrderDiscount: Lists.OrderDiscount = list({
  access: allowAll,
  
  fields: {
    discount: relationship({ ref: 'Discount.orderDiscounts' }),
    order: relationship({ ref: 'Order.orderDiscounts' })
  }
});
