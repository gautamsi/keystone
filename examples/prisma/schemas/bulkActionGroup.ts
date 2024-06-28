
import { list } from '@keystone-6/core';
import { text,relationship,select,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const BulkActionGroup: Lists.BulkActionGroup = list({
  access: allowAll,
  
  fields: {
    friendlyId: text({  }),
    project: relationship({ ref: 'Project.bulkActionGroups' }),
    type: select({ options: [{ label: 'Cancel', value: 'cancel' },
{ label: 'Replay', value: 'replay' }],  }),
    items: relationship({ ref: 'BulkActionItem.group', many: true }),
    status: select({ options: [{ label: 'Pending', value: 'pending' },
{ label: 'Completed', value: 'completed' }], defaultValue: 'PENDING' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } })
  }
});
