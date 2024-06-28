
import { list } from '@keystone-6/core';
import { text,integer } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const TaskRunCounter: Lists.TaskRunCounter = list({
  access: allowAll,
  
  fields: {
    taskIdentifier: text({  }),
    lastNumber: integer({ defaultValue: 0 })
  }
});
