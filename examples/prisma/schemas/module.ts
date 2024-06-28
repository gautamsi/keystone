
import { list } from '@keystone-6/core';
import { text,checkbox,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Module: Lists.Module = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'BigInt' } },
  fields: {
    name: text({  }),
    version: text({  }),
    installed: checkbox({ defaultValue: false }),
    enabled: checkbox({ defaultValue: false }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } })
  }
});
