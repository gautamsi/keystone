
import { list } from '@keystone-6/core';
import { text,bigInt,checkbox,integer,timestamp,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Ability: Lists.Ability = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'BigInt' } },
  fields: {
    name: text({  }),
    title: text({  }),
    entityId: bigInt({  }),
    entityType: text({  }),
    onlyOwned: checkbox({ defaultValue: false }),
    options: text({  }),
    scope: integer({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    permissions: relationship({ ref: 'Permission.ability', many: true })
  }
});
