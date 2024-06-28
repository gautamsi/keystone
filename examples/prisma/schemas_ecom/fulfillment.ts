
import { list } from '@keystone-6/core';
import { json,timestamp,text,checkbox,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Fulfillment: Lists.Fulfillment = list({
  access: allowAll,
  
  fields: {
    trackingNumbers: json({  }),
    data: json({  }),
    shippedAt: timestamp({  }),
    canceledAt: timestamp({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    metadata: json({  }),
    idempotencyKey: text({  }),
    noNotification: checkbox({  }),
    swap: relationship({ ref: 'Swap.fulfillment' }),
    fulfillmentProvider: relationship({ ref: 'FulfillmentProvider.fulfillment' }),
    claimOrder: relationship({ ref: 'ClaimOrder.fulfillment' }),
    order: relationship({ ref: 'Order.fulfillment' }),
    fulfillmentItem: relationship({ ref: 'FulfillmentItem.fulfillment', many: true }),
    trackingLink: relationship({ ref: 'TrackingLink.fulfillment', many: true })
  }
});
