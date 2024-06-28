
import { list } from '@keystone-6/core';
import { text,checkbox,timestamp,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Customer: Lists.Customer = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'BigInt' } },
  fields: {
    prefix: text({  }),
    name: text({  }),
    email: text({  }),
    phone: text({  }),
    password: text({  }),
    rememberToken: text({  }),
    facebookId: text({  }),
    googleId: text({  }),
    githubId: text({  }),
    contactName: text({  }),
    companyName: text({  }),
    website: text({  }),
    enablePortal: checkbox({ defaultValue: false }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    company: relationship({ ref: 'Company.customers' }),
    user: relationship({ ref: 'User.customers' }),
    currency: relationship({ ref: 'Currency.customers' }),
    addresses: relationship({ ref: 'Address.customer', many: true }),
    estimates: relationship({ ref: 'Estimate.customer', many: true }),
    invoices: relationship({ ref: 'Invoice.customer', many: true }),
    payments: relationship({ ref: 'Payment.customer', many: true }),
    recurringInvoices: relationship({ ref: 'RecurringInvoice.customer', many: true })
  }
});
