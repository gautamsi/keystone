
import { list } from '@keystone-6/core';
import { timestamp,text,bigInt,decimal,integer,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Expense: Lists.Expense = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'Int' } },
  fields: {
    expenseDate: timestamp({  }),
    attachmentReceipt: text({  }),
    amount: bigInt({  }),
    notes: text({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    customerId: bigInt({  }),
    exchangeRate: decimal({  }),
    baseAmount: bigInt({  }),
    currencyId: integer({  }),
    company: relationship({ ref: 'Company.expenses' }),
    user: relationship({ ref: 'User.expenses' }),
    expenseCategory: relationship({ ref: 'ExpenseCategory.expenses' }),
    paymentMethod: relationship({ ref: 'PaymentMethod.expenses' })
  }
});
