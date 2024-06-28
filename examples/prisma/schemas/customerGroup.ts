
import { list } from '@keystone-6/core';
import { text,timestamp,json,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const CustomerGroup: Lists.CustomerGroup = list({
  access: allowAll,
  
  fields: {
    name: text({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  }),
    metadata: json({  }),
    customerGroupCustomers: relationship({ ref: 'CustomerGroupCustomer.customerGroup', many: true }),
    discountConditionCustomerGroup: relationship({ ref: 'DiscountConditionCustomerGroup.customerGroup', many: true }),
    priceListCustomerGroups: relationship({ ref: 'PriceListCustomerGroup.customerGroup', many: true })
  }
});
