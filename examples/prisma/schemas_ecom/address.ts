
import { list } from '@keystone-6/core';
import { text,timestamp,json,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Address: Lists.Address = list({
  access: allowAll,
  
  fields: {
    company: text({  }),
    firstName: text({  }),
    lastName: text({  }),
    address_1: text({  }),
    address_2: text({  }),
    city: text({  }),
    province: text({  }),
    postalCode: text({  }),
    phone: text({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  }),
    metadata: json({  }),
    country: relationship({ ref: 'Country.address' }),
    customerAddressCustomerIdTocustomer: relationship({ ref: 'Customer.addressAddressCustomerIdTocustomer' }),
    cartAddressTocartBillingAddressId: relationship({ ref: 'Cart.addressAddressTocartBillingAddressId', many: true }),
    cartAddressTocartShippingAddressId: relationship({ ref: 'Cart.addressAddressTocartShippingAddressId', many: true }),
    claimOrder: relationship({ ref: 'ClaimOrder.address', many: true }),
    customerAddressTocustomerBillingAddressId: relationship({ ref: 'Customer.addressAddressTocustomerBillingAddressId' }),
    orderAddressToorderShippingAddressId: relationship({ ref: 'Order.addressAddressToorderShippingAddressId', many: true }),
    orderAddressToorderBillingAddressId: relationship({ ref: 'Order.addressAddressToorderBillingAddressId', many: true }),
    swap: relationship({ ref: 'Swap.address', many: true })
  }
});
