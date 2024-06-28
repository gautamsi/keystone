
import { list } from '@keystone-6/core';
import { text,json,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const SecretStore: Lists.SecretStore = list({
  access: allowAll,
  
  fields: {
    key: text({  }),
    value: json({  }),
    version: text({ defaultValue: '1' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } })
  }
});
