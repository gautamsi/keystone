
import { list } from '@keystone-6/core';
import { text,timestamp,json,integer } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const IdempotencyKey: Lists.IdempotencyKey = list({
  access: allowAll,
  
  fields: {
    idempotencyKey: text({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    lockedAt: timestamp({  }),
    requestMethod: text({  }),
    requestParams: json({  }),
    requestPath: text({  }),
    responseCode: integer({  }),
    responseBody: json({  }),
    recoveryPoint: text({ defaultValue: 'started' })
  }
});
