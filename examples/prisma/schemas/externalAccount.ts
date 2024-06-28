
import { list } from '@keystone-6/core';
import { text,json,relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const ExternalAccount: Lists.ExternalAccount = list({
  access: allowAll,
  
  fields: {
    identifier: text({  }),
    metadata: json({  }),
    organization: relationship({ ref: 'Organization.externalAccounts' }),
    environment: relationship({ ref: 'RuntimeEnvironment.externalAccount' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    connections: relationship({ ref: 'IntegrationConnection.externalAccount', many: true }),
    events: relationship({ ref: 'EventRecord.externalAccount', many: true }),
    runs: relationship({ ref: 'JobRun.externalAccount', many: true }),
    schedules: relationship({ ref: 'ScheduleSource.externalAccount', many: true }),
    triggerSources: relationship({ ref: 'TriggerSource.externalAccount', many: true }),
    missingConnections: relationship({ ref: 'MissingConnection.externalAccount', many: true }),
    eventDispatcher: relationship({ ref: 'EventDispatcher.externalAccount', many: true })
  }
});
