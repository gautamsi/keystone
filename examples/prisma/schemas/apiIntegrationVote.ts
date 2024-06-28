
import { list } from '@keystone-6/core';
import { text,relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const ApiIntegrationVote: Lists.ApiIntegrationVote = list({
  access: allowAll,
  
  fields: {
    apiIdentifier: text({  }),
    user: relationship({ ref: 'User.apiVotes' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } })
  }
});
