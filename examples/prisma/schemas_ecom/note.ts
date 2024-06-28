
import { list } from '@keystone-6/core';
import { text,timestamp,json } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Note: Lists.Note = list({
  access: allowAll,
  
  fields: {
    value: text({  }),
    resourceType: text({  }),
    resourceId: text({  }),
    authorId: text({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  }),
    metadata: json({  })
  }
});
