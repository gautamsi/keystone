
import { list } from '@keystone-6/core';
import { text,relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const AuthorizationCode: Lists.AuthorizationCode = list({
  access: allowAll,
  
  fields: {
    code: text({  }),
    personalAccessToken: relationship({ ref: 'PersonalAccessToken.authorizationCodes' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } })
  }
});
