
import { list } from '@keystone-6/core';
import { text,json } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Oauth: Lists.Oauth = list({
  access: allowAll,
  
  fields: {
    displayName: text({  }),
    applicationName: text({  }),
    installUrl: text({  }),
    uninstallUrl: text({  }),
    data: json({  })
  }
});
