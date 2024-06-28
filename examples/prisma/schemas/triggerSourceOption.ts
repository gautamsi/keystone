
import { list } from '@keystone-6/core';
import { text,relationship,timestamp,checkbox } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const TriggerSourceOption: Lists.TriggerSourceOption = list({
  access: allowAll,
  
  fields: {
    name: text({  }),
    value: text({  }),
    source: relationship({ ref: 'TriggerSource.options' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    registered: checkbox({ defaultValue: false })
  }
});
