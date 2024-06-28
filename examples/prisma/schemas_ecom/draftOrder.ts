
import { list } from '@keystone-6/core';
import { select,integer,timestamp,json,text,checkbox,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const DraftOrder: Lists.DraftOrder = list({
  access: allowAll,
  
  fields: {
    status: select({ options: [{ label: 'Open', value: 'open' },
{ label: 'Completed', value: 'completed' }], defaultValue: 'open' }),
    displayId: integer({ defaultValue: [object Object] }),
    canceledAt: timestamp({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    completedAt: timestamp({  }),
    metadata: json({  }),
    idempotencyKey: text({  }),
    noNotificationOrder: checkbox({  }),
    cart: relationship({ ref: 'Cart.draftOrder' }),
    orderDraftOrderOrderIdToorder: relationship({ ref: 'Order.draftOrderDraftOrderOrderIdToorder' }),
    orderDraftOrderToorderDraftOrderId: relationship({ ref: 'Order.draftOrderDraftOrderToorderDraftOrderId' })
  }
});
