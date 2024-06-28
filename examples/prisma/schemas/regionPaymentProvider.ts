
import { list } from '@keystone-6/core';
import { relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const RegionPaymentProvider: Lists.RegionPaymentProvider = list({
  access: allowAll,
  
  fields: {
    paymentProvider: relationship({ ref: 'PaymentProvider.regionPaymentProviders' }),
    region: relationship({ ref: 'Region.regionPaymentProviders' })
  }
});
