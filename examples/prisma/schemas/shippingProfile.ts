
import { list } from '@keystone-6/core';
import { text,select,timestamp,json,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const ShippingProfile: Lists.ShippingProfile = list({
  access: allowAll,
  
  fields: {
    name: text({  }),
    type: select({ options: [{ label: 'Default', value: 'default' },
{ label: 'Gift Card', value: 'gift_card' },
{ label: 'Custom', value: 'custom' }],  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  }),
    metadata: json({  }),
    product: relationship({ ref: 'Product.shippingProfile', many: true }),
    shippingOption: relationship({ ref: 'ShippingOption.shippingProfile', many: true })
  }
});
