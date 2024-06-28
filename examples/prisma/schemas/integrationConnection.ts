
import { list } from '@keystone-6/core';
import { select,timestamp,json,text,relationship,checkbox } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const IntegrationConnection: Lists.IntegrationConnection = list({
  access: allowAll,
  
  fields: {
    connectionType: select({ options: [{ label: 'External', value: 'external' },
{ label: 'Developer', value: 'developer' }], defaultValue: 'DEVELOPER' }),
    expiresAt: timestamp({  }),
    metadata: json({  }),
    scopes: text({  }),
    dataReference: relationship({ ref: 'SecretReference.connections' }),
    integration: relationship({ ref: 'Integration.connections' }),
    organization: relationship({ ref: 'Organization.connections' }),
    externalAccount: relationship({ ref: 'ExternalAccount.connections' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    enabled: checkbox({ defaultValue: true }),
    runConnections: relationship({ ref: 'RunConnection.connection', many: true })
  }
});
