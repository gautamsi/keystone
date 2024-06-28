
import { list } from '@keystone-6/core';
import { integer,text,json,UNDEFINED__Bytes,checkbox,relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const WebhookRequestDelivery: Lists.WebhookRequestDelivery = list({
  access: allowAll,
  
  fields: {
    number: integer({  }),
    url: text({  }),
    method: text({  }),
    headers: json({  }),
    body: UNDEFINED__Bytes({  }),
    verified: checkbox({ defaultValue: false }),
    error: text({  }),
    webhook: relationship({ ref: 'Webhook.requestDeliveries' }),
    environment: relationship({ ref: 'RuntimeEnvironment.webhookRequestDeliveries' }),
    webhookEnvironment: relationship({ ref: 'WebhookEnvironment.requestDeliveries' }),
    endpoint: relationship({ ref: 'Endpoint.webhookRequestDeliveries' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deliveredAt: timestamp({  })
  }
});
