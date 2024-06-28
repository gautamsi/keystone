
import { list } from '@keystone-6/core';
import { text,select,relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Integration: Lists.Integration = list({
  access: allowAll,
  
  fields: {
    slug: text({  }),
    title: text({  }),
    description: text({  }),
    setupStatus: select({ options: [{ label: 'Missing Fields', value: 'missing_fields' },
{ label: 'Complete', value: 'complete' }], defaultValue: 'COMPLETE' }),
    authSource: select({ options: [{ label: 'Hosted', value: 'hosted' },
{ label: 'Local', value: 'local' },
{ label: 'Resolver', value: 'resolver' }], defaultValue: 'HOSTED' }),
    definition: relationship({ ref: 'IntegrationDefinition.integration' }),
    authMethod: relationship({ ref: 'IntegrationAuthMethod.integrations' }),
    connectionType: select({ options: [{ label: 'External', value: 'external' },
{ label: 'Developer', value: 'developer' }], defaultValue: 'DEVELOPER' }),
    scopes: text({  }),
    customClientReference: relationship({ ref: 'SecretReference.integrations' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    organization: relationship({ ref: 'Organization.integrations' }),
    attempts: relationship({ ref: 'ConnectionAttempt.integration', many: true }),
    connections: relationship({ ref: 'IntegrationConnection.integration', many: true }),
    jobIntegrations: relationship({ ref: 'JobIntegration.integration', many: true }),
    sources: relationship({ ref: 'TriggerSource.integration', many: true }),
    webhooks: relationship({ ref: 'Webhook.integration', many: true }),
    missingConnections: relationship({ ref: 'MissingConnection.integration', many: true }),
    runConnection: relationship({ ref: 'RunConnection.integration', many: true })
  }
});
