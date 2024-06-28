
import { list } from '@keystone-6/core';
import { checkbox,text,json,relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Webhook: Lists.Webhook = list({
  access: allowAll,
  
  fields: {
    active: checkbox({ defaultValue: false }),
    key: text({  }),
    params: json({  }),
    webhookEnvironments: relationship({ ref: 'WebhookEnvironment.webhook', many: true }),
    requestDeliveries: relationship({ ref: 'WebhookRequestDelivery.webhook', many: true }),
    httpEndpoint: relationship({ ref: 'TriggerHttpEndpoint.webhook' }),
    project: relationship({ ref: 'Project.webhooks' }),
    integration: relationship({ ref: 'Integration.webhooks' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } })
  }
});
