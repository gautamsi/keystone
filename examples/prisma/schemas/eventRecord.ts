
import { list } from '@keystone-6/core';
import { text,timestamp,json,select,relationship,checkbox } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const EventRecord: Lists.EventRecord = list({
  access: allowAll,
  
  fields: {
    eventId: text({  }),
    name: text({  }),
    timestamp: timestamp({  }),
    payload: json({  }),
    payloadType: select({ options: [{ label: 'Json', value: 'json' },
{ label: 'Request', value: 'request' }], defaultValue: 'JSON' }),
    context: json({  }),
    sourceContext: json({  }),
    source: text({ defaultValue: 'trigger.dev' }),
    organization: relationship({ ref: 'Organization.events' }),
    environment: relationship({ ref: 'RuntimeEnvironment.events' }),
    project: relationship({ ref: 'Project.events' }),
    externalAccount: relationship({ ref: 'ExternalAccount.events' }),
    httpEndpoint: relationship({ ref: 'TriggerHttpEndpoint.eventRecords' }),
    httpEndpointEnvironment: relationship({ ref: 'TriggerHttpEndpointEnvironment.eventRecords' }),
    deliverAt: timestamp({  }),
    deliveredAt: timestamp({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    cancelledAt: timestamp({  }),
    isTest: checkbox({ defaultValue: false }),
    internal: checkbox({ defaultValue: false }),
    runs: relationship({ ref: 'JobRun.event', many: true })
  }
});
