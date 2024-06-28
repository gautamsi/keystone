
import { list } from '@keystone-6/core';
import { integer,timestamp,checkbox,UNDEFINED__Float,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const GiftCardTransaction: Lists.GiftCardTransaction = list({
  access: allowAll,
  
  fields: {
    amount: integer({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    isTaxable: checkbox({  }),
    taxRate: UNDEFINED__Float({  }),
    giftCard: relationship({ ref: 'GiftCard.giftCardTransaction' }),
    order: relationship({ ref: 'Order.giftCardTransaction' })
  }
});
