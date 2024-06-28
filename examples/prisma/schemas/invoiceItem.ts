
import { list } from '@keystone-6/core';
import { text,bigInt,decimal,timestamp,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const InvoiceItem: Lists.InvoiceItem = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'Int' } },
  fields: {
    name: text({  }),
    description: text({  }),
    discountType: text({  }),
    price: bigInt({  }),
    quantity: decimal({  }),
    unitName: text({  }),
    discount: decimal({  }),
    discountVal: bigInt({  }),
    tax: bigInt({  }),
    total: bigInt({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    basePrice: bigInt({  }),
    exchangeRate: decimal({  }),
    baseDiscountVal: bigInt({  }),
    baseTax: bigInt({  }),
    baseTotal: bigInt({  }),
    company: relationship({ ref: 'Company.invoiceItems' }),
    invoice: relationship({ ref: 'Invoice.invoiceItems' }),
    item: relationship({ ref: 'Item.invoiceItems' }),
    recurringInvoice: relationship({ ref: 'RecurringInvoice.invoiceItems' }),
    taxes: relationship({ ref: 'Tax.invoiceItem', many: true })
  }
});
