
import { list } from '@keystone-6/core';
import { text,select,relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const SecretReference: Lists.SecretReference = list({
  access: allowAll,
  
  fields: {
    key: text({  }),
    provider: select({ options: [{ label: 'Database', value: 'database' },
{ label: 'Aws Param Store', value: 'aws_param_store' }], defaultValue: 'DATABASE' }),
    connections: relationship({ ref: 'IntegrationConnection.dataReference', many: true }),
    integrations: relationship({ ref: 'Integration.customClientReference', many: true }),
    triggerSources: relationship({ ref: 'TriggerSource.secretReference', many: true }),
    httpEndpoints: relationship({ ref: 'TriggerHttpEndpoint.secretReference', many: true }),
    environmentVariableValues: relationship({ ref: 'EnvironmentVariableValue.valueReference', many: true }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    organizationIntegration: relationship({ ref: 'OrganizationIntegration.tokenReference', many: true })
  }
});
