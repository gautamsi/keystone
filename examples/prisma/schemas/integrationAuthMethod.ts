
import { list } from '@keystone-6/core';
import { text,json,timestamp,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const IntegrationAuthMethod: Lists.IntegrationAuthMethod = list({
  access: allowAll,
  
  fields: {
    key: text({  }),
    name: text({  }),
    description: text({  }),
    type: text({  }),
    client: json({  }),
    config: json({  }),
    scopes: json({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    integrations: relationship({ ref: 'Integration.authMethod', many: true }),
    definition: relationship({ ref: 'IntegrationDefinition.authMethods' }),
    help: json({  })
  }
});
