
import { list } from '@keystone-6/core';
import { text,timestamp,json,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const ReturnReason: Lists.ReturnReason = list({
  access: allowAll,
  
  fields: {
    value: text({  }),
    label: text({  }),
    description: text({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  }),
    metadata: json({  }),
    returnReason: relationship({ ref: 'ReturnReason.otherReturnReason' }),
    returnItem: relationship({ ref: 'ReturnItem.returnReason', many: true }),
    otherReturnReason: relationship({ ref: 'ReturnReason.returnReason', many: true })
  }
});
