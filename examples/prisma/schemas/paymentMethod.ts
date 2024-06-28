
import { list } from '@keystone-6/core';
import { text,timestamp,select,checkbox,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const PaymentMethod: Lists.PaymentMethod = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'Int' } },
  fields: {
    name: text({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    driver: text({  }),
    type: select({ options: [{ label: 'General', value: 'general' },
{ label: 'Module', value: 'module' }], defaultValue: 'GENERAL' }),
    settings: text({  }),
    active: checkbox({ defaultValue: false }),
    useTestEnv: checkbox({ defaultValue: false }),
    company: relationship({ ref: 'Company.paymentMethods' }),
    expenses: relationship({ ref: 'Expense.paymentMethod', many: true }),
    payments: relationship({ ref: 'Payment.paymentMethod', many: true })
  }
});
