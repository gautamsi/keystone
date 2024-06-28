
import { list } from '@keystone-6/core';
import { text,integer,checkbox,timestamp,json,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const GiftCard: Lists.GiftCard = list({
  access: allowAll,
  
  fields: {
    code: text({  }),
    value: integer({  }),
    balance: integer({  }),
    isDisabled: checkbox({ defaultValue: false }),
    endsAt: timestamp({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  }),
    metadata: json({  }),
    region: relationship({ ref: 'Region.giftCard' }),
    order: relationship({ ref: 'Order.giftCard' }),
    cartGiftCards: relationship({ ref: 'CartGiftCard.giftCard', many: true }),
    giftCardTransaction: relationship({ ref: 'GiftCardTransaction.giftCard', many: true }),
    orderGiftCards: relationship({ ref: 'OrderGiftCard.giftCard', many: true })
  }
});
