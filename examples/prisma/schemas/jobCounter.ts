
import { list } from '@keystone-6/core';
import { text,integer } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const JobCounter: Lists.JobCounter = list({
  access: allowAll,
  
  fields: {
    jobId: text({  }),
    lastNumber: integer({ defaultValue: 0 })
  }
});
