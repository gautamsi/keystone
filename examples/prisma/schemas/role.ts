
import { list } from '@keystone-6/core';
import { text,integer,timestamp,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Role: Lists.Role = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'BigInt' } },
  fields: {
    name: text({  }),
    title: text({  }),
    level: integer({  }),
    scope: integer({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    assignedRoles: relationship({ ref: 'AssignedRole.role', many: true })
  }
});
