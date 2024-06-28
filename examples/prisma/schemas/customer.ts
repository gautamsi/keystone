
import { list } from '@keystone-6/core';
import { text,checkbox,timestamp,json,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Customer: Lists.Customer = list({
  access: allowAll,
  
  fields: {
    email: text({  }),
    firstName: text({  }),
    lastName: text({  }),
    passwordHash: text({  }),
    phone: text({  }),
    hasAccount: checkbox({ defaultValue: false }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  }),
    metadata: json({  }),
    addressAddressTocustomerBillingAddressId: relationship({ ref: 'Address.customerAddressTocustomerBillingAddressId' }),
    addressAddressCustomerIdTocustomer: relationship({ ref: 'Address.customerAddressCustomerIdTocustomer', many: true }),
    cart: relationship({ ref: 'Cart.customer', many: true }),
    customerGroupCustomers: relationship({ ref: 'CustomerGroupCustomer.customer', many: true }),
    notification: relationship({ ref: 'Notification.customer', many: true }),
    order: relationship({ ref: 'Order.customer', many: true })
  }
});
