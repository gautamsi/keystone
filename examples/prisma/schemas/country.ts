
import { list } from '@keystone-6/core';
import { text,integer,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Country: Lists.Country = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'Int' } },
  fields: {
    code: text({  }),
    name: text({  }),
    phonecode: integer({  }),
    addresses: relationship({ ref: 'Address.country', many: true })
  }
});
