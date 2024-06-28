
import { list } from '@keystone-6/core';
import { relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const ClaimItemTag: Lists.ClaimItemTag = list({
  access: allowAll,
  
  fields: {
    claimItem: relationship({ ref: 'ClaimItem.claimItemTags' }),
    claimTag: relationship({ ref: 'ClaimTag.claimItemTags' })
  }
});
