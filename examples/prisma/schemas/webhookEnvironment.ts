
import { list } from '@keystone-6/core';
import { checkbox,json,relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const WebhookEnvironment: Lists.WebhookEnvironment = list({
  access: allowAll,
  
  fields: {
    active: checkbox({ defaultValue: false }),
    config: json({  }),
    desiredConfig: json({  }),
    requestDeliveries: relationship({ ref: 'WebhookRequestDelivery.webhookEnvironment', many: true }),
    endpoint: relationship({ ref: 'Endpoint.webhookEnvironments' }),
    environment: relationship({ ref: 'RuntimeEnvironment.webhookEnvironments' }),
    webhook: relationship({ ref: 'Webhook.webhookEnvironments' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } })
  }
});
