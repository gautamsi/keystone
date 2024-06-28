
import { list } from '@keystone-6/core';
import { text,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const DataMigration: Lists.DataMigration = list({
  access: allowAll,
  
  fields: {
    name: text({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    completedAt: timestamp({  })
  }
});
