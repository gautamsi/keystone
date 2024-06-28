
import { list } from '@keystone-6/core';
import { integer,timestamp,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const MoneyAmount: Lists.MoneyAmount = list({
  access: allowAll,
  
  fields: {
    amount: integer({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  }),
    minQuantity: integer({  }),
    maxQuantity: integer({  }),
    productVariant: relationship({ ref: 'ProductVariant.moneyAmount' }),
    region: relationship({ ref: 'Region.moneyAmount' }),
    currency: relationship({ ref: 'Currency.moneyAmount' }),
    priceList: relationship({ ref: 'PriceList.moneyAmount' })
  }
});
