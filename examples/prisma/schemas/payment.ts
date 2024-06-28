
import { list } from '@keystone-6/core';
import { integer,text,timestamp,bigInt,decimal,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Payment: Lists.Payment = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'BigInt' } },
  fields: {
    sequenceNumber: integer({  }),
    customerSequenceNumber: integer({  }),
    paymentNumber: text({  }),
    paymentDate: timestamp({  }),
    notes: text({  }),
    amount: bigInt({  }),
    uniqueHash: text({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    exchangeRate: decimal({  }),
    baseAmount: bigInt({  }),
    company: relationship({ ref: 'Company.payments' }),
    user: relationship({ ref: 'User.payments' }),
    currency: relationship({ ref: 'Currency.payments' }),
    customer: relationship({ ref: 'Customer.payments' }),
    invoice: relationship({ ref: 'Invoice.payments' }),
    paymentMethod: relationship({ ref: 'PaymentMethod.payments' }),
    transaction: relationship({ ref: 'Transaction.payments' })
  }
});
