
import { list } from '@keystone-6/core';
import { text,bigInt,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Notification: Lists.Notification = list({
  access: allowAll,
  
  fields: {
    type: text({  }),
    notifiableType: text({  }),
    notifiableId: bigInt({  }),
    data: text({  }),
    readAt: timestamp({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } })
  }
});
