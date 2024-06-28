
import { list } from '@keystone-6/core';
import { checkbox,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const PaymentProvider: Lists.PaymentProvider = list({
  access: allowAll,
  
  fields: {
    isInstalled: checkbox({ defaultValue: true }),
    regionPaymentProviders: relationship({ ref: 'RegionPaymentProvider.paymentProvider', many: true })
  }
});
