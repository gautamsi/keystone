
import { list } from '@keystone-6/core';
import { text,relationship,timestamp,integer } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const JobQueue: Lists.JobQueue = list({
  access: allowAll,
  
  fields: {
    name: text({  }),
    environment: relationship({ ref: 'RuntimeEnvironment.jobQueue' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    jobCount: integer({ defaultValue: 0 }),
    maxJobs: integer({ defaultValue: 100 }),
    runs: relationship({ ref: 'JobRun.queue', many: true }),
    jobVersion: relationship({ ref: 'JobVersion.queue', many: true })
  }
});
