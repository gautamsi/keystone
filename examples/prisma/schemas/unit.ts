
import { list } from '@keystone-6/core';
import { text,timestamp,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Unit: Lists.Unit = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'Int' } },
  fields: {
    name: text({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    company: relationship({ ref: 'Company.units' }),
    items: relationship({ ref: 'Item.unit', many: true })
  }
});
