
import { list } from '@keystone-6/core';
import { text,select,timestamp,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const PriceList: Lists.PriceList = list({
  access: allowAll,
  
  fields: {
    name: text({  }),
    description: text({  }),
    type: select({ options: [{ label: 'Sale', value: 'sale' },
{ label: 'Override', value: 'override' }], defaultValue: 'sale' }),
    status: select({ options: [{ label: 'Active', value: 'active' },
{ label: 'Draft', value: 'draft' }], defaultValue: 'draft' }),
    startsAt: timestamp({  }),
    endsAt: timestamp({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  }),
    moneyAmount: relationship({ ref: 'MoneyAmount.priceList', many: true }),
    priceListCustomerGroups: relationship({ ref: 'PriceListCustomerGroup.priceList', many: true })
  }
});
