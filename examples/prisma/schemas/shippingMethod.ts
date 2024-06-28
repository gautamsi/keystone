
import { list } from '@keystone-6/core';
import { integer,json,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const ShippingMethod: Lists.ShippingMethod = list({
  access: allowAll,
  
  fields: {
    price: integer({  }),
    data: json({  }),
    return: relationship({ ref: 'Renamedreturn.shippingMethod' }),
    order: relationship({ ref: 'Order.shippingMethod' }),
    claimOrder: relationship({ ref: 'ClaimOrder.shippingMethod' }),
    cart: relationship({ ref: 'Cart.shippingMethod' }),
    swap: relationship({ ref: 'Swap.shippingMethod' }),
    shippingOption: relationship({ ref: 'ShippingOption.shippingMethod' }),
    shippingMethodTaxLine: relationship({ ref: 'ShippingMethodTaxLine.shippingMethod', many: true })
  }
});
