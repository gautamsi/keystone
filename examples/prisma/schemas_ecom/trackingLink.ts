
import { list } from '@keystone-6/core';
import { text,timestamp,json,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const TrackingLink: Lists.TrackingLink = list({
  access: allowAll,
  
  fields: {
    url: text({  }),
    trackingNumber: text({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  }),
    metadata: json({  }),
    idempotencyKey: text({  }),
    fulfillment: relationship({ ref: 'Fulfillment.trackingLink' })
  }
});
