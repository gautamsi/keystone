
import { list } from '@keystone-6/core';
import { relationship,select,text,json,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const ProjectAlertStorage: Lists.ProjectAlertStorage = list({
  access: allowAll,
  
  fields: {
    project: relationship({ ref: 'Project.alertStorages' }),
    alertChannel: relationship({ ref: 'ProjectAlertChannel.alertStorages' }),
    alertType: select({ options: [{ label: 'Task Run Attempt', value: 'task_run_attempt' },
{ label: 'Deployment Failure', value: 'deployment_failure' },
{ label: 'Deployment Success', value: 'deployment_success' }],  }),
    storageId: text({  }),
    storageData: json({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } })
  }
});
