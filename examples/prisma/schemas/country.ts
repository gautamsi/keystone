
import { list } from '@keystone-6/core';
import { text,integer,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Country: Lists.Country = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'Int' } },
  fields: {
    iso_2: text({  }),
    iso_3: text({  }),
    numCode: integer({  }),
    name: text({  }),
    displayName: text({  }),
    region: relationship({ ref: 'Region.country' }),
    address: relationship({ ref: 'Address.country', many: true })
  }
});
