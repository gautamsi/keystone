
import { list } from '@keystone-6/core';
import { text,checkbox,timestamp,bigInt,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const CustomField: Lists.CustomField = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'BigInt' } },
  fields: {
    name: text({  }),
    slug: text({  }),
    label: text({  }),
    modelType: text({  }),
    type: text({  }),
    placeholder: text({  }),
    options: text({  }),
    booleanAnswer: checkbox({  }),
    dateAnswer: timestamp({  }),
    timeAnswer: timestamp({  }),
    stringAnswer: text({  }),
    numberAnswer: bigInt({  }),
    dateTimeAnswer: timestamp({  }),
    isRequired: checkbox({ defaultValue: false }),
    order: bigInt({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    company: relationship({ ref: 'Company.customFields' }),
    customFieldValues: relationship({ ref: 'CustomFieldValue.customField', many: true })
  }
});
