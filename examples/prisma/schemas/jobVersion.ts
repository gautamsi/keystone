
import { list } from '@keystone-6/core';
import { text,json,relationship,select,checkbox,integer,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const JobVersion: Lists.JobVersion = list({
  access: allowAll,
  
  fields: {
    version: text({  }),
    eventSpecification: json({  }),
    properties: json({  }),
    triggerLink: text({  }),
    triggerHelp: json({  }),
    job: relationship({ ref: 'Job.versions' }),
    endpoint: relationship({ ref: 'Endpoint.jobVersions' }),
    environment: relationship({ ref: 'RuntimeEnvironment.jobVersions' }),
    organization: relationship({ ref: 'Organization.jobVersions' }),
    project: relationship({ ref: 'Project.jobVersion' }),
    queue: relationship({ ref: 'JobQueue.jobVersion' }),
    startPosition: select({ options: [{ label: 'Initial', value: 'initial' },
{ label: 'Latest', value: 'latest' }], defaultValue: 'INITIAL' }),
    preprocessRuns: checkbox({ defaultValue: false }),
    concurrencyLimit: integer({  }),
    concurrencyLimitGroup: relationship({ ref: 'ConcurrencyLimitGroup.jobVersion' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    runs: relationship({ ref: 'JobRun.version', many: true }),
    integrations: relationship({ ref: 'JobIntegration.version', many: true }),
    aliases: relationship({ ref: 'JobAlias.version', many: true }),
    examples: relationship({ ref: 'EventExample.jobVersion', many: true }),
    dynamicTriggers: relationship({ ref: 'DynamicTrigger.sourceRegistrationJob', many: true }),
    triggerSources: relationship({ ref: 'TriggerSource.sourceRegistrationJob', many: true }),
    status: select({ options: [{ label: 'Active', value: 'active' },
{ label: 'Disabled', value: 'disabled' }], defaultValue: 'ACTIVE' })
  }
});
