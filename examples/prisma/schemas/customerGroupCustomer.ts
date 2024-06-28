
import { list } from '@keystone-6/core';
import { relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const CustomerGroupCustomer: Lists.CustomerGroupCustomer = list({
  access: allowAll,
  
  fields: {
    customer: relationship({ ref: 'Customer.customerGroupCustomers' }),
    customerGroup: relationship({ ref: 'CustomerGroup.customerGroupCustomers' })
  }
});
