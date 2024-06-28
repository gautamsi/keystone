
import { list } from '@keystone-6/core';
import { text,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const WorkerDeploymentPromotion: Lists.WorkerDeploymentPromotion = list({
  access: allowAll,
  
  fields: {
    label: text({  }),
    deployment: relationship({ ref: 'WorkerDeployment.promotions' }),
    environment: relationship({ ref: 'RuntimeEnvironment.workerDeploymentPromotions' })
  }
});
