
import { list } from '@keystone-6/core';
import { text,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const JobAlias: Lists.JobAlias = list({
  access: allowAll,
  
  fields: {
    name: text({ defaultValue: 'latest' }),
    value: text({  }),
    version: relationship({ ref: 'JobVersion.aliases' }),
    job: relationship({ ref: 'Job.aliases' }),
    environment: relationship({ ref: 'RuntimeEnvironment.jobAliases' })
  }
});
