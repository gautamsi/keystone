
import { list } from '@keystone-6/core';
import { timestamp,json,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const DiscountConditionProductCollection: Lists.DiscountConditionProductCollection = list({
  access: allowAll,
  
  fields: {
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    metadata: json({  }),
    productCollection: relationship({ ref: 'ProductCollection.discountConditionProductCollection' }),
    discountCondition: relationship({ ref: 'DiscountCondition.discountConditionProductCollection' })
  }
});
