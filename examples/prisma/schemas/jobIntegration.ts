
import { list } from '@keystone-6/core';
import { text,relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const JobIntegration: Lists.JobIntegration = list({
  access: allowAll,
  
  fields: {
    key: text({  }),
    version: relationship({ ref: 'JobVersion.integrations' }),
    job: relationship({ ref: 'Job.integrations' }),
    integration: relationship({ ref: 'Integration.jobIntegrations' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } })
  }
});
