
import { list } from '@keystone-6/core';
import { checkbox,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const FulfillmentProvider: Lists.FulfillmentProvider = list({
  access: allowAll,
  
  fields: {
    isInstalled: checkbox({ defaultValue: true }),
    fulfillment: relationship({ ref: 'Fulfillment.fulfillmentProvider', many: true }),
    regionFulfillmentProviders: relationship({ ref: 'RegionFulfillmentProvider.fulfillmentProvider', many: true }),
    shippingOption: relationship({ ref: 'ShippingOption.fulfillmentProvider', many: true })
  }
});
