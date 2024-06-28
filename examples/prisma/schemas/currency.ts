
import { list } from '@keystone-6/core';
import { text,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Currency: Lists.Currency = list({
  access: allowAll,
  
  fields: {
    code: text({  }),
    symbol: text({  }),
    symbolNative: text({  }),
    name: text({  }),
    moneyAmount: relationship({ ref: 'MoneyAmount.currency', many: true }),
    order: relationship({ ref: 'Order.currency', many: true }),
    payment: relationship({ ref: 'Payment.currency', many: true }),
    region: relationship({ ref: 'Region.currency', many: true }),
    store: relationship({ ref: 'Store.currency', many: true }),
    storeCurrencies: relationship({ ref: 'StoreCurrency.currency', many: true })
  }
});
