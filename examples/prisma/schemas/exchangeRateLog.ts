
import { list } from '@keystone-6/core';
import { decimal,timestamp,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const ExchangeRateLog: Lists.ExchangeRateLog = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'BigInt' } },
  fields: {
    exchangeRate: decimal({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    currenciesCurrenciesToexchangeRateLogsBaseCurrencyId: relationship({ ref: 'Currency.exchangeRateLogsCurrenciesToexchangeRateLogsBaseCurrencyId' }),
    company: relationship({ ref: 'Company.exchangeRateLogs' }),
    currenciesCurrenciesToexchangeRateLogsCurrencyId: relationship({ ref: 'Currency.exchangeRateLogsCurrenciesToexchangeRateLogsCurrencyId' })
  }
});
