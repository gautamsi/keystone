
import { list } from '@keystone-6/core';
import { text,bigInt,decimal,integer,timestamp,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Tax: Lists.Tax = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'Int' } },
  fields: {
    name: text({  }),
    amount: bigInt({  }),
    percent: decimal({  }),
    compoundTax: integer({ defaultValue: 0 }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    exchangeRate: decimal({  }),
    baseAmount: bigInt({  }),
    company: relationship({ ref: 'Company.taxes' }),
    currency: relationship({ ref: 'Currency.taxes' }),
    estimate: relationship({ ref: 'Estimate.taxes' }),
    estimateItem: relationship({ ref: 'EstimateItem.taxes' }),
    invoice: relationship({ ref: 'Invoice.taxes' }),
    invoiceItem: relationship({ ref: 'InvoiceItem.taxes' }),
    item: relationship({ ref: 'Item.taxes' }),
    recurringInvoice: relationship({ ref: 'RecurringInvoice.taxes' }),
    taxType: relationship({ ref: 'TaxType.taxes' })
  }
});
