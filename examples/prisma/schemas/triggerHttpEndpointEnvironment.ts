
import { list } from '@keystone-6/core';
import { checkbox,json,text,relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const TriggerHttpEndpointEnvironment: Lists.TriggerHttpEndpointEnvironment = list({
  access: allowAll,
  
  fields: {
    active: checkbox({ defaultValue: false }),
    immediateResponseFilter: json({  }),
    skipTriggeringRuns: checkbox({ defaultValue: false }),
    source: text({  }),
    environment: relationship({ ref: 'RuntimeEnvironment.httpEndpointEnvironments' }),
    endpoint: relationship({ ref: 'Endpoint.httpEndpointEnvironments' }),
    httpEndpoint: relationship({ ref: 'TriggerHttpEndpoint.httpEndpointEnvironments' }),
    eventRecords: relationship({ ref: 'EventRecord.httpEndpointEnvironment', many: true }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } })
  }
});
