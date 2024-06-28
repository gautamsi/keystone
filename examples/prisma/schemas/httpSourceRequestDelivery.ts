
import { list } from '@keystone-6/core';
import { text,json,UNDEFINED__Bytes,relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const HttpSourceRequestDelivery: Lists.HttpSourceRequestDelivery = list({
  access: allowAll,
  
  fields: {
    url: text({  }),
    method: text({  }),
    headers: json({  }),
    body: UNDEFINED__Bytes({  }),
    source: relationship({ ref: 'TriggerSource.httpDeliveries' }),
    endpoint: relationship({ ref: 'Endpoint.httpRequestDeliveries' }),
    environment: relationship({ ref: 'RuntimeEnvironment.requestDeliveries' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deliveredAt: timestamp({  })
  }
});
