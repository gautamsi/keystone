
import { list } from '@keystone-6/core';
import { text,timestamp,json,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Store: Lists.Store = list({
  access: allowAll,
  
  fields: {
    name: text({ defaultValue: 'Medusa Store' }),
    swapLinkTemplate: text({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    metadata: json({  }),
    paymentLinkTemplate: text({  }),
    inviteLinkTemplate: text({  }),
    currency: relationship({ ref: 'Currency.store' }),
    storeCurrencies: relationship({ ref: 'StoreCurrency.store', many: true })
  }
});
