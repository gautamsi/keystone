
import { list } from '@keystone-6/core';
import { select,text,integer,timestamp,json,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const ClaimItem: Lists.ClaimItem = list({
  access: allowAll,
  
  fields: {
    reason: select({ options: [{ label: 'Missing Item', value: 'missing_item' },
{ label: 'Wrong Item', value: 'wrong_item' },
{ label: 'Production Failure', value: 'production_failure' },
{ label: 'Other', value: 'other' }],  }),
    note: text({  }),
    quantity: integer({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  }),
    metadata: json({  }),
    productVariant: relationship({ ref: 'ProductVariant.claimItem' }),
    lineItem: relationship({ ref: 'LineItem.claimItem' }),
    claimOrder: relationship({ ref: 'ClaimOrder.claimItem' }),
    claimImage: relationship({ ref: 'ClaimImage.claimItem', many: true }),
    claimItemTags: relationship({ ref: 'ClaimItemTag.claimItem', many: true })
  }
});
