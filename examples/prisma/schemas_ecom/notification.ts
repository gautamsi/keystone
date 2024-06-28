
import { list } from '@keystone-6/core';
import { text,json,timestamp,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Notification: Lists.Notification = list({
  access: allowAll,
  
  fields: {
    eventName: text({  }),
    resourceType: text({  }),
    resourceId: text({  }),
    to: text({  }),
    data: json({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    notificationProvider: relationship({ ref: 'NotificationProvider.notification' }),
    notification: relationship({ ref: 'Notification.otherNotification' }),
    customer: relationship({ ref: 'Customer.notification' }),
    otherNotification: relationship({ ref: 'Notification.notification', many: true })
  }
});
