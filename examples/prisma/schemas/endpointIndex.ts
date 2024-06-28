
import { list } from '@keystone-6/core';
import { relationship,timestamp,select,json,text } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const EndpointIndex: Lists.EndpointIndex = list({
  access: allowAll,
  
  fields: {
    endpoint: relationship({ ref: 'Endpoint.indexings' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    source: select({ options: [{ label: 'Manual', value: 'manual' },
{ label: 'Api', value: 'api' },
{ label: 'Internal', value: 'internal' },
{ label: 'Hook', value: 'hook' }], defaultValue: 'MANUAL' }),
    sourceData: json({  }),
    reason: text({  }),
    status: select({ options: [{ label: 'Pending', value: 'pending' },
{ label: 'Started', value: 'started' },
{ label: 'Success', value: 'success' },
{ label: 'Failure', value: 'failure' }], defaultValue: 'PENDING' }),
    data: json({  }),
    stats: json({  }),
    error: json({  })
  }
});
