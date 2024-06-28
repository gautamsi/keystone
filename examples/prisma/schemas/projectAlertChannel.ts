
import { list } from '@keystone-6/core';
import { text,checkbox,relationship,select,json,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const ProjectAlertChannel: Lists.ProjectAlertChannel = list({
  access: allowAll,
  
  fields: {
    friendlyId: text({  }),
    deduplicationKey: text({ defaultValue: '[object Object]' }),
    userProvidedDeduplicationKey: checkbox({ defaultValue: false }),
    integration: relationship({ ref: 'OrganizationIntegration.alertChannels' }),
    enabled: checkbox({ defaultValue: true }),
    type: select({ options: [{ label: 'Email', value: 'email' },
{ label: 'Slack', value: 'slack' },
{ label: 'Webhook', value: 'webhook' }],  }),
    name: text({  }),
    properties: json({  }),
    alertTypes: select({ options: [{ label: 'Task Run Attempt', value: 'task_run_attempt' },
{ label: 'Deployment Failure', value: 'deployment_failure' },
{ label: 'Deployment Success', value: 'deployment_success' }],  }),
    environmentTypes: select({ options: [{ label: 'Production', value: 'production' },
{ label: 'Staging', value: 'staging' },
{ label: 'Development', value: 'development' },
{ label: 'Preview', value: 'preview' }], defaultValue: 'STAGING,PRODUCTION' }),
    project: relationship({ ref: 'Project.alertChannels' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    alerts: relationship({ ref: 'ProjectAlert.channel', many: true }),
    alertStorages: relationship({ ref: 'ProjectAlertStorage.alertChannel', many: true })
  }
});
