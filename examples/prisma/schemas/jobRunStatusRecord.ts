
import { list } from '@keystone-6/core';
import { text,relationship,json,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const JobRunStatusRecord: Lists.JobRunStatusRecord = list({
  access: allowAll,
  
  fields: {
    key: text({  }),
    run: relationship({ ref: 'JobRun.statuses' }),
    label: text({  }),
    state: text({  }),
    data: json({  }),
    history: json({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } })
  }
});
