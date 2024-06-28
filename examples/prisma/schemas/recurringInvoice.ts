
import { list } from '@keystone-6/core';
import { timestamp,checkbox,select,text,integer,decimal,bigInt,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const RecurringInvoice: Lists.RecurringInvoice = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'BigInt' } },
  fields: {
    startsAt: timestamp({  }),
    sendAutomatically: checkbox({ defaultValue: false }),
    status: select({ options: [{ label: 'Completed', value: 'completed' },
{ label: 'On Hold', value: 'on_hold' },
{ label: 'Active', value: 'active' }], defaultValue: 'ACTIVE' }),
    nextInvoiceAt: timestamp({  }),
    frequency: text({  }),
    limitBy: select({ options: [{ label: 'None', value: 'none' },
{ label: 'Count', value: 'count' },
{ label: 'Date', value: 'date' }], defaultValue: 'NONE' }),
    limitCount: integer({  }),
    limitDate: timestamp({  }),
    exchangeRate: decimal({  }),
    taxPerItem: text({  }),
    discountPerItem: text({  }),
    notes: text({  }),
    discountType: text({  }),
    discount: decimal({  }),
    discountVal: bigInt({  }),
    subTotal: bigInt({  }),
    total: bigInt({  }),
    tax: bigInt({  }),
    templateName: text({  }),
    dueAmount: bigInt({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    salesTaxType: text({  }),
    salesTaxAddressType: text({  }),
    company: relationship({ ref: 'Company.recurringInvoices' }),
    user: relationship({ ref: 'User.recurringInvoices' }),
    currency: relationship({ ref: 'Currency.recurringInvoices' }),
    customer: relationship({ ref: 'Customer.recurringInvoices' }),
    invoiceItems: relationship({ ref: 'InvoiceItem.recurringInvoice', many: true }),
    invoices: relationship({ ref: 'Invoice.recurringInvoice', many: true }),
    taxes: relationship({ ref: 'Tax.recurringInvoice', many: true })
  }
});
