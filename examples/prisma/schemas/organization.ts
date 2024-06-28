
import { list } from '@keystone-6/core';
import { text,integer,timestamp,checkbox,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Organization: Lists.Organization = list({
  access: allowAll,
  
  fields: {
    slug: text({  }),
    title: text({  }),
    maximumExecutionTimePerRunInMs: integer({ defaultValue: 900000 }),
    maximumConcurrencyLimit: integer({ defaultValue: 10 }),
    maximumSchedulesLimit: integer({ defaultValue: 5 }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  }),
    companySize: text({  }),
    runsEnabled: checkbox({ defaultValue: true }),
    v3Enabled: checkbox({ defaultValue: false }),
    v2Enabled: checkbox({ defaultValue: false }),
    v2MarqsEnabled: checkbox({ defaultValue: false }),
    hasRequestedV3: checkbox({ defaultValue: false }),
    environments: relationship({ ref: 'RuntimeEnvironment.organization', many: true }),
    connections: relationship({ ref: 'IntegrationConnection.organization', many: true }),
    endpoints: relationship({ ref: 'Endpoint.organization', many: true }),
    jobs: relationship({ ref: 'Job.organization', many: true }),
    jobVersions: relationship({ ref: 'JobVersion.organization', many: true }),
    events: relationship({ ref: 'EventRecord.organization', many: true }),
    jobRuns: relationship({ ref: 'JobRun.organization', many: true }),
    projects: relationship({ ref: 'Project.organization', many: true }),
    members: relationship({ ref: 'OrgMember.organization', many: true }),
    invites: relationship({ ref: 'OrgMemberInvite.organization', many: true }),
    externalAccounts: relationship({ ref: 'ExternalAccount.organization', many: true }),
    integrations: relationship({ ref: 'Integration.organization', many: true }),
    sources: relationship({ ref: 'TriggerSource.organization', many: true }),
    organizationIntegrations: relationship({ ref: 'OrganizationIntegration.organization', many: true })
  }
});
