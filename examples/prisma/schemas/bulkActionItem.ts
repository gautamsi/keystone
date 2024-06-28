
import { list } from '@keystone-6/core';
import { text,relationship,select,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const BulkActionItem: Lists.BulkActionItem = list({
  access: allowAll,
  
  fields: {
    friendlyId: text({  }),
    group: relationship({ ref: 'BulkActionGroup.items' }),
    type: select({ options: [{ label: 'Cancel', value: 'cancel' },
{ label: 'Replay', value: 'replay' }],  }),
    status: select({ options: [{ label: 'Pending', value: 'pending' },
{ label: 'Completed', value: 'completed' },
{ label: 'Failed', value: 'failed' }], defaultValue: 'PENDING' }),
    sourceRun: relationship({ ref: 'TaskRun.sourceBulkActionItems' }),
    destinationRun: relationship({ ref: 'TaskRun.destinationBulkActionItems' }),
    error: text({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } })
  }
});
