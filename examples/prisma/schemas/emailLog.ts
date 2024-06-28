
import { list } from '@keystone-6/core';
import { text,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const EmailLog: Lists.EmailLog = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'BigInt' } },
  fields: {
    from: text({  }),
    to: text({  }),
    subject: text({  }),
    body: text({  }),
    mailableType: text({  }),
    mailableId: text({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    token: text({  })
  }
});
