
import { list } from '@keystone-6/core';
import { text,select,relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const RunConnection: Lists.RunConnection = list({
  access: allowAll,
  
  fields: {
    key: text({  }),
    authSource: select({ options: [{ label: 'Hosted', value: 'hosted' },
{ label: 'Local', value: 'local' },
{ label: 'Resolver', value: 'resolver' }], defaultValue: 'HOSTED' }),
    run: relationship({ ref: 'JobRun.runConnections' }),
    connection: relationship({ ref: 'IntegrationConnection.runConnections' }),
    integration: relationship({ ref: 'Integration.runConnection' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    tasks: relationship({ ref: 'Task.runConnection', many: true })
  }
});
