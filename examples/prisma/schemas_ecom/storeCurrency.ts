
import { list } from '@keystone-6/core';
import { relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const StoreCurrency: Lists.StoreCurrency = list({
  access: allowAll,
  
  fields: {
    currency: relationship({ ref: 'Currency.storeCurrencies' }),
    store: relationship({ ref: 'Store.storeCurrencies' })
  }
});
