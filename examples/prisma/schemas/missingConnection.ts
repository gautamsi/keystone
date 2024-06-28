
import { list } from '@keystone-6/core';
import { checkbox,relationship,select,text,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const MissingConnection: Lists.MissingConnection = list({
  access: allowAll,
  
  fields: {
    resolved: checkbox({ defaultValue: false }),
    runs: relationship({ ref: 'JobRun.missingConnections', many: true }),
    integration: relationship({ ref: 'Integration.missingConnections' }),
    connectionType: select({ options: [{ label: 'External', value: 'external' },
{ label: 'Developer', value: 'developer' }], defaultValue: 'DEVELOPER' }),
    externalAccount: relationship({ ref: 'ExternalAccount.missingConnections' }),
    accountIdentifier: text({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } })
  }
});
