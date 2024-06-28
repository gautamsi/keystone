
import { list } from '@keystone-6/core';
import { text,json,checkbox,timestamp,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const BatchJob: Lists.BatchJob = list({
  access: allowAll,
  
  fields: {
    type: text({  }),
    context: json({  }),
    result: json({  }),
    dryRun: checkbox({ defaultValue: false }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    preProcessedAt: timestamp({  }),
    confirmedAt: timestamp({  }),
    processingAt: timestamp({  }),
    completedAt: timestamp({  }),
    failedAt: timestamp({  }),
    canceledAt: timestamp({  }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  }),
    user: relationship({ ref: 'User.batchJob' })
  }
});
