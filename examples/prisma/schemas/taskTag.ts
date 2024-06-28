
import { list } from '@keystone-6/core';
import { text,relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const TaskTag: Lists.TaskTag = list({
  access: allowAll,
  
  fields: {
    name: text({  }),
    friendlyId: text({  }),
    runs: relationship({ ref: 'TaskRun.tags', many: true }),
    project: relationship({ ref: 'Project.taskTags' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } })
  }
});
