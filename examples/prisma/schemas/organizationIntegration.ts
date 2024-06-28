
import { list } from '@keystone-6/core';
import { text,select,json,relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const OrganizationIntegration: Lists.OrganizationIntegration = list({
  access: allowAll,
  
  fields: {
    friendlyId: text({  }),
    service: select({ options: [{ label: 'Slack', value: 'slack' }],  }),
    integrationData: json({  }),
    tokenReference: relationship({ ref: 'SecretReference.organizationIntegration' }),
    organization: relationship({ ref: 'Organization.organizationIntegrations' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    alertChannels: relationship({ ref: 'ProjectAlertChannel.integration', many: true })
  }
});
