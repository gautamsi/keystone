
import { list } from '@keystone-6/core';
import { integer,timestamp,json,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const CustomShippingOption: Lists.CustomShippingOption = list({
  access: allowAll,
  
  fields: {
    price: integer({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  }),
    metadata: json({  }),
    shippingOption: relationship({ ref: 'ShippingOption.customShippingOption' }),
    cart: relationship({ ref: 'Cart.customShippingOption' })
  }
});
