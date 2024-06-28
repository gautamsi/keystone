
import { list } from '@keystone-6/core';
import { text,select,integer,checkbox,json,timestamp,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const ShippingOption: Lists.ShippingOption = list({
  access: allowAll,
  
  fields: {
    name: text({  }),
    priceType: select({ options: [{ label: 'Flat Rate', value: 'flat_rate' },
{ label: 'Calculated', value: 'calculated' }],  }),
    amount: integer({  }),
    isReturn: checkbox({ defaultValue: false }),
    data: json({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  }),
    metadata: json({  }),
    adminOnly: checkbox({ defaultValue: false }),
    region: relationship({ ref: 'Region.shippingOption' }),
    fulfillmentProvider: relationship({ ref: 'FulfillmentProvider.shippingOption' }),
    shippingProfile: relationship({ ref: 'ShippingProfile.shippingOption' }),
    customShippingOption: relationship({ ref: 'CustomShippingOption.shippingOption', many: true }),
    shippingMethod: relationship({ ref: 'ShippingMethod.shippingOption', many: true }),
    shippingOptionRequirement: relationship({ ref: 'ShippingOptionRequirement.shippingOption', many: true }),
    shippingTaxRate: relationship({ ref: 'ShippingTaxRate.shippingOption', many: true })
  }
});
