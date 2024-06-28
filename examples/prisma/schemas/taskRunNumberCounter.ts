
import { list } from '@keystone-6/core';
import { text,relationship,integer } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const TaskRunNumberCounter: Lists.TaskRunNumberCounter = list({
  access: allowAll,
  
  fields: {
    taskIdentifier: text({  }),
    environment: relationship({ ref: 'RuntimeEnvironment.taskRunNumberCounter' }),
    lastNumber: integer({ defaultValue: 0 })
  }
});
