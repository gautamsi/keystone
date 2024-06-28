
import { list } from '@keystone-6/core';
import { timestamp,json,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const DiscountConditionCustomerGroup: Lists.DiscountConditionCustomerGroup = list({
  access: allowAll,
  
  fields: {
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    metadata: json({  }),
    customerGroup: relationship({ ref: 'CustomerGroup.discountConditionCustomerGroup' }),
    discountCondition: relationship({ ref: 'DiscountCondition.discountConditionCustomerGroup' })
  }
});
