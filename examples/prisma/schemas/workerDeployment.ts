
import { list } from '@keystone-6/core';
import { text,json,select,relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const WorkerDeployment: Lists.WorkerDeployment = list({
  access: allowAll,
  
  fields: {
    contentHash: text({  }),
    friendlyId: text({  }),
    shortCode: text({  }),
    version: text({  }),
    imageReference: text({  }),
    externalBuildData: json({  }),
    status: select({ options: [{ label: 'Pending', value: 'pending' },
{ label: 'Building', value: 'building' },
{ label: 'Deploying', value: 'deploying' },
{ label: 'Deployed', value: 'deployed' },
{ label: 'Failed', value: 'failed' },
{ label: 'Canceled', value: 'canceled' },
{ label: 'Timed Out', value: 'timed_out' }], defaultValue: 'PENDING' }),
    project: relationship({ ref: 'Project.workerDeployment' }),
    environment: relationship({ ref: 'RuntimeEnvironment.workerDeployments' }),
    worker: relationship({ ref: 'BackgroundWorker.deployment' }),
    triggeredBy: relationship({ ref: 'User.deployments' }),
    deployedAt: timestamp({  }),
    failedAt: timestamp({  }),
    errorData: json({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    promotions: relationship({ ref: 'WorkerDeploymentPromotion.deployment', many: true }),
    alerts: relationship({ ref: 'ProjectAlert.workerDeployment', many: true })
  }
});
