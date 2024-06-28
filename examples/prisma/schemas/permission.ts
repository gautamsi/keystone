
import { list } from '@keystone-6/core';
import { bigInt,text,checkbox,integer,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Permission: Lists.Permission = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'BigInt' } },
  fields: {
    entityId: bigInt({  }),
    entityType: text({  }),
    forbidden: checkbox({ defaultValue: false }),
    scope: integer({  }),
    ability: relationship({ ref: 'Ability.permissions' })
  }
});
