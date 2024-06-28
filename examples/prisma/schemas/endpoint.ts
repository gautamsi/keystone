
import { list } from '@keystone-6/core';
import { text,relationship,timestamp,integer } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Endpoint: Lists.Endpoint = list({
  access: allowAll,
  
  fields: {
    slug: text({  }),
    url: text({  }),
    environment: relationship({ ref: 'RuntimeEnvironment.endpoints' }),
    organization: relationship({ ref: 'Organization.endpoints' }),
    project: relationship({ ref: 'Project.endpoints' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    indexingHookIdentifier: text({  }),
    version: text({ defaultValue: 'unknown' }),
    sdkVersion: text({ defaultValue: 'unknown' }),
    runChunkExecutionLimit: integer({ defaultValue: 60000 }),
    startTaskThreshold: integer({ defaultValue: 750 }),
    beforeExecuteTaskThreshold: integer({ defaultValue: 1500 }),
    beforeCompleteTaskThreshold: integer({ defaultValue: 750 }),
    afterCompleteTaskThreshold: integer({ defaultValue: 750 }),
    jobVersions: relationship({ ref: 'JobVersion.endpoint', many: true }),
    jobRuns: relationship({ ref: 'JobRun.endpoint', many: true }),
    httpRequestDeliveries: relationship({ ref: 'HttpSourceRequestDelivery.endpoint', many: true }),
    webhookRequestDeliveries: relationship({ ref: 'WebhookRequestDelivery.endpoint', many: true }),
    dynamictriggers: relationship({ ref: 'DynamicTrigger.endpoint', many: true }),
    sources: relationship({ ref: 'TriggerSource.endpoint', many: true }),
    indexings: relationship({ ref: 'EndpointIndex.endpoint', many: true }),
    httpEndpointEnvironments: relationship({ ref: 'TriggerHttpEndpointEnvironment.endpoint', many: true }),
    webhookEnvironments: relationship({ ref: 'WebhookEnvironment.endpoint', many: true })
  }
});
