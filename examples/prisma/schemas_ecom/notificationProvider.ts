
import { list } from '@keystone-6/core';
import { checkbox,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const NotificationProvider: Lists.NotificationProvider = list({
  access: allowAll,
  
  fields: {
    isInstalled: checkbox({ defaultValue: true }),
    notification: relationship({ ref: 'Notification.notificationProvider', many: true })
  }
});
