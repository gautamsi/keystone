
import { list } from '@keystone-6/core';
import { text,timestamp,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Company: Lists.Company = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'Int' } },
  fields: {
    name: text({  }),
    logo: text({  }),
    uniqueHash: text({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    slug: text({  }),
    user: relationship({ ref: 'User.companies' }),
    addresses: relationship({ ref: 'Address.company', many: true }),
    companySettings: relationship({ ref: 'CompanySetting.company', many: true }),
    customFieldValues: relationship({ ref: 'CustomFieldValue.company', many: true }),
    customFields: relationship({ ref: 'CustomField.company', many: true }),
    customers: relationship({ ref: 'Customer.company', many: true }),
    estimateItems: relationship({ ref: 'EstimateItem.company', many: true }),
    estimates: relationship({ ref: 'Estimate.company', many: true }),
    exchangeRateLogs: relationship({ ref: 'ExchangeRateLog.company', many: true }),
    exchangeRateProviders: relationship({ ref: 'ExchangeRateProvider.company', many: true }),
    expenseCategories: relationship({ ref: 'ExpenseCategory.company', many: true }),
    expenses: relationship({ ref: 'Expense.company', many: true }),
    invoiceItems: relationship({ ref: 'InvoiceItem.company', many: true }),
    invoices: relationship({ ref: 'Invoice.company', many: true }),
    items: relationship({ ref: 'Item.company', many: true }),
    notes: relationship({ ref: 'Note.company', many: true }),
    paymentMethods: relationship({ ref: 'PaymentMethod.company', many: true }),
    payments: relationship({ ref: 'Payment.company', many: true }),
    recurringInvoices: relationship({ ref: 'RecurringInvoice.company', many: true }),
    taxTypes: relationship({ ref: 'TaxType.company', many: true }),
    taxes: relationship({ ref: 'Tax.company', many: true }),
    transactions: relationship({ ref: 'Transaction.company', many: true }),
    units: relationship({ ref: 'Unit.company', many: true }),
    userCompany: relationship({ ref: 'UserCompany.company', many: true })
  }
});
