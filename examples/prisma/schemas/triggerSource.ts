
import { list } from '@keystone-6/core';
import { text,json,select,relationship,checkbox,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const TriggerSource: Lists.TriggerSource = list({
  access: allowAll,
  
  fields: {
    key: text({  }),
    params: json({  }),
    channel: select({ options: [{ label: 'Http', value: 'http' },
{ label: 'Sqs', value: 'sqs' },
{ label: 'Smtp', value: 'smtp' }], defaultValue: 'HTTP' }),
    channelData: json({  }),
    version: text({ defaultValue: '1' }),
    options: relationship({ ref: 'TriggerSourceOption.source', many: true }),
    metadata: json({  }),
    secretReference: relationship({ ref: 'SecretReference.triggerSources' }),
    organization: relationship({ ref: 'Organization.sources' }),
    environment: relationship({ ref: 'RuntimeEnvironment.sources' }),
    endpoint: relationship({ ref: 'Endpoint.sources' }),
    project: relationship({ ref: 'Project.sources' }),
    integration: relationship({ ref: 'Integration.sources' }),
    dynamicTrigger: relationship({ ref: 'DynamicTrigger.sources' }),
    externalAccount: relationship({ ref: 'ExternalAccount.triggerSources' }),
    sourceRegistrationJob: relationship({ ref: 'JobVersion.triggerSources' }),
    dynamicSourceId: text({  }),
    dynamicSourceMetadata: json({  }),
    active: checkbox({ defaultValue: false }),
    interactive: checkbox({ defaultValue: false }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    httpDeliveries: relationship({ ref: 'HttpSourceRequestDelivery.source', many: true }),
    registrations: relationship({ ref: 'DynamicTriggerRegistration.source', many: true })
  }
});
