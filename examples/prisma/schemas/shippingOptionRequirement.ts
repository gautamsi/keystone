
import { list } from '@keystone-6/core';
import { select,integer,timestamp,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const ShippingOptionRequirement: Lists.ShippingOptionRequirement = list({
  access: allowAll,
  
  fields: {
    type: select({ options: [{ label: 'Min Subtotal', value: 'min_subtotal' },
{ label: 'Max Subtotal', value: 'max_subtotal' }],  }),
    amount: integer({  }),
    deletedAt: timestamp({  }),
    shippingOption: relationship({ ref: 'ShippingOption.shippingOptionRequirement' })
  }
});
