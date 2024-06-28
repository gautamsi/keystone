
import { list } from '@keystone-6/core';
import { text,checkbox,relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Job: Lists.Job = list({
  access: allowAll,
  
  fields: {
    slug: text({  }),
    title: text({  }),
    internal: checkbox({ defaultValue: false }),
    organization: relationship({ ref: 'Organization.jobs' }),
    project: relationship({ ref: 'Project.jobs' }),
    versions: relationship({ ref: 'JobVersion.job', many: true }),
    runs: relationship({ ref: 'JobRun.job', many: true }),
    integrations: relationship({ ref: 'JobIntegration.job', many: true }),
    aliases: relationship({ ref: 'JobAlias.job', many: true }),
    dynamicTriggers: relationship({ ref: 'DynamicTrigger.jobs', many: true }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  })
  }
});
