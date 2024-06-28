
import { list } from '@keystone-6/core';
import { text,integer,checkbox,timestamp,bigInt,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const CustomFieldValue: Lists.CustomFieldValue = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'BigInt' } },
  fields: {
    customFieldValuableType: text({  }),
    customFieldValuableId: integer({  }),
    type: text({  }),
    booleanAnswer: checkbox({  }),
    dateAnswer: timestamp({  }),
    timeAnswer: timestamp({  }),
    stringAnswer: text({  }),
    numberAnswer: bigInt({  }),
    dateTimeAnswer: timestamp({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    company: relationship({ ref: 'Company.customFieldValues' }),
    customField: relationship({ ref: 'CustomField.customFieldValues' })
  }
});
