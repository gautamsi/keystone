
import { list } from '@keystone-6/core';
import { text,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const IntegrationDefinition: Lists.IntegrationDefinition = list({
  access: allowAll,
  
  fields: {
    name: text({  }),
    instructions: text({  }),
    description: text({  }),
    icon: text({  }),
    packageName: text({ defaultValue: '' }),
    authMethods: relationship({ ref: 'IntegrationAuthMethod.definition', many: true }),
    integration: relationship({ ref: 'Integration.definition', many: true })
  }
});
