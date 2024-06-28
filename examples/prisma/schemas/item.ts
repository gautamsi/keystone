
import { list } from '@keystone-6/core';
import { text,bigInt,timestamp,checkbox,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Item: Lists.Item = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'Int' } },
  fields: {
    name: text({  }),
    description: text({  }),
    price: bigInt({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    taxPerItem: checkbox({ defaultValue: false }),
    company: relationship({ ref: 'Company.items' }),
    user: relationship({ ref: 'User.items' }),
    currency: relationship({ ref: 'Currency.items' }),
    unit: relationship({ ref: 'Unit.items' }),
    estimateItems: relationship({ ref: 'EstimateItem.item', many: true }),
    invoiceItems: relationship({ ref: 'InvoiceItem.item', many: true }),
    taxes: relationship({ ref: 'Tax.item', many: true })
  }
});
