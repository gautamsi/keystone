
import { list } from '@keystone-6/core';
import { text,timestamp,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Transaction: Lists.Transaction = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'BigInt' } },
  fields: {
    transactionId: text({  }),
    uniqueHash: text({  }),
    type: text({  }),
    status: text({  }),
    transactionDate: timestamp({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    company: relationship({ ref: 'Company.transactions' }),
    invoice: relationship({ ref: 'Invoice.transactions' }),
    payments: relationship({ ref: 'Payment.transaction', many: true })
  }
});
