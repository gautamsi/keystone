
import { list } from '@keystone-6/core';
import { text,UNDEFINED__Bytes,relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const KeyValueItem: Lists.KeyValueItem = list({
  access: allowAll,
  
  fields: {
    key: text({  }),
    value: UNDEFINED__Bytes({  }),
    environment: relationship({ ref: 'RuntimeEnvironment.keyValueItems' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } })
  }
});
