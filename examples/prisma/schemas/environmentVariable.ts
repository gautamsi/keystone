
import { list } from '@keystone-6/core';
import { text,relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const EnvironmentVariable: Lists.EnvironmentVariable = list({
  access: allowAll,
  
  fields: {
    friendlyId: text({  }),
    key: text({  }),
    project: relationship({ ref: 'Project.environmentVariables' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    values: relationship({ ref: 'EnvironmentVariableValue.variable', many: true })
  }
});
