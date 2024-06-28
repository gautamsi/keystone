
import { list } from '@keystone-6/core';
import { text,checkbox,timestamp,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const User: Lists.User = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'Int' } },
  fields: {
    name: text({  }),
    email: text({  }),
    phone: text({  }),
    password: text({  }),
    role: text({ defaultValue: 'user' }),
    rememberToken: text({  }),
    facebookId: text({  }),
    googleId: text({  }),
    githubId: text({  }),
    contactName: text({  }),
    companyName: text({  }),
    website: text({  }),
    enablePortal: checkbox({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    user: relationship({ ref: 'User.otherUsers' }),
    currency: relationship({ ref: 'Currency.users' }),
    addresses: relationship({ ref: 'Address.user', many: true }),
    companies: relationship({ ref: 'Company.user', many: true }),
    customers: relationship({ ref: 'Customer.user', many: true }),
    estimates: relationship({ ref: 'Estimate.user', many: true }),
    expenses: relationship({ ref: 'Expense.user', many: true }),
    invoices: relationship({ ref: 'Invoice.user', many: true }),
    items: relationship({ ref: 'Item.user', many: true }),
    payments: relationship({ ref: 'Payment.user', many: true }),
    recurringInvoices: relationship({ ref: 'RecurringInvoice.user', many: true }),
    userCompany: relationship({ ref: 'UserCompany.user', many: true }),
    userSettings: relationship({ ref: 'UserSetting.user', many: true }),
    otherUsers: relationship({ ref: 'User.user', many: true })
  }
});
