
import { list } from '@keystone-6/core';
import { text,integer } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const WebhookDeliveryCounter: Lists.WebhookDeliveryCounter = list({
  access: allowAll,
  
  fields: {
    webhookId: text({  }),
    lastNumber: integer({ defaultValue: 0 })
  }
});
