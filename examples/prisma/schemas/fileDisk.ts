
import { list } from '@keystone-6/core';
import { text,checkbox,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const FileDisk: Lists.FileDisk = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'BigInt' } },
  fields: {
    name: text({  }),
    type: text({ defaultValue: 'REMOTE' }),
    driver: text({  }),
    setAsDefault: checkbox({ defaultValue: false }),
    credentials: text({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } })
  }
});
