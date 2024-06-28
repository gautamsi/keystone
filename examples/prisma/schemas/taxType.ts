
import { list } from '@keystone-6/core';
import { text,decimal,integer,timestamp,select,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const TaxType: Lists.TaxType = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'Int' } },
  fields: {
    name: text({  }),
    percent: decimal({  }),
    compoundTax: integer({ defaultValue: 0 }),
    collectiveTax: integer({ defaultValue: 0 }),
    description: text({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    type: select({ options: [{ label: 'General', value: 'general' },
{ label: 'Module', value: 'module' }], defaultValue: 'GENERAL' }),
    company: relationship({ ref: 'Company.taxTypes' }),
    taxes: relationship({ ref: 'Tax.taxType', many: true })
  }
});
