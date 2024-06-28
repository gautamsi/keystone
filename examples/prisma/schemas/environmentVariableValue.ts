
import { list } from '@keystone-6/core';
import { relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const EnvironmentVariableValue: Lists.EnvironmentVariableValue = list({
  access: allowAll,
  
  fields: {
    valueReference: relationship({ ref: 'SecretReference.environmentVariableValues' }),
    variable: relationship({ ref: 'EnvironmentVariable.values' }),
    environment: relationship({ ref: 'RuntimeEnvironment.environmentVariableValues' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } })
  }
});
