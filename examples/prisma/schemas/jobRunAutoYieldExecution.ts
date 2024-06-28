
import { list } from '@keystone-6/core';
import { relationship,integer,text,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const JobRunAutoYieldExecution: Lists.JobRunAutoYieldExecution = list({
  access: allowAll,
  
  fields: {
    run: relationship({ ref: 'JobRun.autoYieldExecution' }),
    timeRemaining: integer({  }),
    timeElapsed: integer({  }),
    limit: integer({  }),
    location: text({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } })
  }
});
