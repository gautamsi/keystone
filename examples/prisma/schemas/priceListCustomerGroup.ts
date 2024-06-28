
import { list } from '@keystone-6/core';
import { relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const PriceListCustomerGroup: Lists.PriceListCustomerGroup = list({
  access: allowAll,
  
  fields: {
    priceList: relationship({ ref: 'PriceList.priceListCustomerGroups' }),
    customerGroup: relationship({ ref: 'CustomerGroup.priceListCustomerGroups' })
  }
});
