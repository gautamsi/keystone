
import { list } from '@keystone-6/core';
import { text,timestamp,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Address: Lists.Address = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'BigInt' } },
  fields: {
    name: text({  }),
    addressStreet_1: text({  }),
    addressStreet_2: text({  }),
    city: text({  }),
    state: text({  }),
    zip: text({  }),
    phone: text({  }),
    fax: text({  }),
    type: text({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    company: relationship({ ref: 'Company.addresses' }),
    country: relationship({ ref: 'Country.addresses' }),
    customer: relationship({ ref: 'Customer.addresses' }),
    user: relationship({ ref: 'User.addresses' })
  }
});
