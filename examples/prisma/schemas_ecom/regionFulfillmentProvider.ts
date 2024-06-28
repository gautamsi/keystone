
import { list } from '@keystone-6/core';
import { relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const RegionFulfillmentProvider: Lists.RegionFulfillmentProvider = list({
  access: allowAll,
  
  fields: {
    fulfillmentProvider: relationship({ ref: 'FulfillmentProvider.regionFulfillmentProviders' }),
    region: relationship({ ref: 'Region.regionFulfillmentProviders' })
  }
});
