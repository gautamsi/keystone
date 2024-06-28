
import { list } from '@keystone-6/core';
import { text,integer,checkbox,timestamp,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Currency: Lists.Currency = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'Int' } },
  fields: {
    name: text({  }),
    code: text({  }),
    symbol: text({  }),
    precision: integer({  }),
    thousandSeparator: text({  }),
    decimalSeparator: text({  }),
    swapCurrencySymbol: checkbox({ defaultValue: false }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    customers: relationship({ ref: 'Customer.currency', many: true }),
    estimates: relationship({ ref: 'Estimate.currency', many: true }),
    exchangeRateLogsCurrenciesToexchangeRateLogsBaseCurrencyId: relationship({ ref: 'ExchangeRateLog.currenciesCurrenciesToexchangeRateLogsBaseCurrencyId', many: true }),
    exchangeRateLogsCurrenciesToexchangeRateLogsCurrencyId: relationship({ ref: 'ExchangeRateLog.currenciesCurrenciesToexchangeRateLogsCurrencyId', many: true }),
    invoices: relationship({ ref: 'Invoice.currency', many: true }),
    items: relationship({ ref: 'Item.currency', many: true }),
    payments: relationship({ ref: 'Payment.currency', many: true }),
    recurringInvoices: relationship({ ref: 'RecurringInvoice.currency', many: true }),
    taxes: relationship({ ref: 'Tax.currency', many: true }),
    users: relationship({ ref: 'User.currency', many: true })
  }
});
