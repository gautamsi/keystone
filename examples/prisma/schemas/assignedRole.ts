
import { list } from '@keystone-6/core';
import { bigInt,text,integer,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const AssignedRole: Lists.AssignedRole = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'BigInt' } },
  fields: {
    entityId: bigInt({  }),
    entityType: text({  }),
    restrictedToId: bigInt({  }),
    restrictedToType: text({  }),
    scope: integer({  }),
    role: relationship({ ref: 'Role.assignedRoles' })
  }
});
