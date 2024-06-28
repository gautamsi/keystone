
import { list } from '@keystone-6/core';
import { bigInt,text } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Migration: Lists.Migration = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'Int' } },
  fields: {
    timestamp: bigInt({  }),
    name: text({  })
  }
});
