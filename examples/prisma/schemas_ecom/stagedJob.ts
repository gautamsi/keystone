
import { list } from '@keystone-6/core';
import { text,json } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const StagedJob: Lists.StagedJob = list({
  access: allowAll,
  
  fields: {
    eventName: text({  }),
    data: json({  })
  }
});
