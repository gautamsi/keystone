
import { list } from '@keystone-6/core';
import { integer,timestamp,text,decimal,bigInt,checkbox,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Invoice: Lists.Invoice = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'Int' } },
  fields: {
    sequenceNumber: integer({  }),
    customerSequenceNumber: integer({  }),
    invoiceDate: timestamp({  }),
    dueDate: timestamp({  }),
    invoiceNumber: text({  }),
    referenceNumber: text({  }),
    status: text({  }),
    paidStatus: text({  }),
    taxPerItem: text({  }),
    discountPerItem: text({  }),
    notes: text({  }),
    discountType: text({  }),
    discount: decimal({  }),
    discountVal: bigInt({  }),
    subTotal: bigInt({  }),
    total: bigInt({  }),
    tax: bigInt({  }),
    dueAmount: bigInt({  }),
    sent: checkbox({ defaultValue: false }),
    viewed: checkbox({ defaultValue: false }),
    uniqueHash: text({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    templateName: text({  }),
    exchangeRate: decimal({  }),
    baseDiscountVal: bigInt({  }),
    baseSubTotal: bigInt({  }),
    baseTotal: bigInt({  }),
    baseTax: bigInt({  }),
    baseDueAmount: bigInt({  }),
    salesTaxType: text({  }),
    salesTaxAddressType: text({  }),
    overdue: checkbox({ defaultValue: false }),
    company: relationship({ ref: 'Company.invoices' }),
    user: relationship({ ref: 'User.invoices' }),
    currency: relationship({ ref: 'Currency.invoices' }),
    customer: relationship({ ref: 'Customer.invoices' }),
    recurringInvoice: relationship({ ref: 'RecurringInvoice.invoices' }),
    invoiceItems: relationship({ ref: 'InvoiceItem.invoice', many: true }),
    payments: relationship({ ref: 'Payment.invoice', many: true }),
    taxes: relationship({ ref: 'Tax.invoice', many: true }),
    transactions: relationship({ ref: 'Transaction.invoice', many: true })
  }
});
