
import { list } from '@keystone-6/core';
import { text,json,relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const TriggerHttpEndpoint: Lists.TriggerHttpEndpoint = list({
  access: allowAll,
  
  fields: {
    key: text({  }),
    title: text({  }),
    icon: text({  }),
    properties: json({  }),
    webhook: relationship({ ref: 'Webhook.httpEndpoint' }),
    secretReference: relationship({ ref: 'SecretReference.httpEndpoints' }),
    project: relationship({ ref: 'Project.httpEndpoints' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    httpEndpointEnvironments: relationship({ ref: 'TriggerHttpEndpointEnvironment.httpEndpoint', many: true }),
    eventRecords: relationship({ ref: 'EventRecord.httpEndpoint', many: true })
  }
});
