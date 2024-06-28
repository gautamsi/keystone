
import { list } from '@keystone-6/core';
import { text,checkbox,timestamp,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const ExchangeRateProvider: Lists.ExchangeRateProvider = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'BigInt' } },
  fields: {
    driver: text({  }),
    key: text({  }),
    currencies: text({  }),
    driverConfig: text({  }),
    active: checkbox({ defaultValue: true }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    company: relationship({ ref: 'Company.exchangeRateProviders' })
  }
});
