
import { list } from '@keystone-6/core';
import { text,select,json,checkbox,timestamp,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const User: Lists.User = list({
  access: allowAll,
  
  fields: {
    email: text({  }),
    authenticationMethod: select({ options: [{ label: 'Github', value: 'github' },
{ label: 'Magic Link', value: 'magic_link' }],  }),
    authenticationProfile: json({  }),
    authenticationExtraParams: json({  }),
    authIdentifier: text({  }),
    displayName: text({  }),
    name: text({  }),
    avatarUrl: text({  }),
    admin: checkbox({ defaultValue: false }),
    isOnCloudWaitlist: checkbox({ defaultValue: false }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    featureCloud: checkbox({ defaultValue: false }),
    isOnHostedRepoWaitlist: checkbox({ defaultValue: false }),
    marketingEmails: checkbox({ defaultValue: true }),
    confirmedBasicDetails: checkbox({ defaultValue: false }),
    referralSource: text({  }),
    orgMemberships: relationship({ ref: 'OrgMember.user', many: true }),
    sentInvites: relationship({ ref: 'OrgMemberInvite.inviter', many: true }),
    apiVotes: relationship({ ref: 'ApiIntegrationVote.user', many: true }),
    invitationCode: relationship({ ref: 'InvitationCode.users' }),
    personalAccessTokens: relationship({ ref: 'PersonalAccessToken.user', many: true }),
    deployments: relationship({ ref: 'WorkerDeployment.triggeredBy', many: true })
  }
});
