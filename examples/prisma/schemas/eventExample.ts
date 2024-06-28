
import { list } from '@keystone-6/core';
import { text,json,relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const EventExample: Lists.EventExample = list({
  access: allowAll,
  
  fields: {
    slug: text({  }),
    name: text({  }),
    icon: text({  }),
    payload: json({  }),
    jobVersion: relationship({ ref: 'JobVersion.examples' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } })
  }
});
