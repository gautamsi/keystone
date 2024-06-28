
import { list } from '@keystone-6/core';
import { text,bigInt,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const PersonalAccessToken: Lists.PersonalAccessToken = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'BigInt' } },
  fields: {
    tokenableType: text({  }),
    tokenableId: bigInt({  }),
    name: text({  }),
    token: text({  }),
    abilities: text({  }),
    lastUsedAt: timestamp({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } })
  }
});
