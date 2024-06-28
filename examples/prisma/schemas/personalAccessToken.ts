
import { list } from '@keystone-6/core';
import { text,json,relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const PersonalAccessToken: Lists.PersonalAccessToken = list({
  access: allowAll,
  
  fields: {
    name: text({  }),
    encryptedToken: json({  }),
    obfuscatedToken: text({  }),
    hashedToken: text({  }),
    user: relationship({ ref: 'User.personalAccessTokens' }),
    revokedAt: timestamp({  }),
    lastAccessedAt: timestamp({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    authorizationCodes: relationship({ ref: 'AuthorizationCode.personalAccessToken', many: true })
  }
});
