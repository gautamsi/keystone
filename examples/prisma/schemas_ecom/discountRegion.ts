
import { list } from '@keystone-6/core';
import { relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const DiscountRegion: Lists.DiscountRegion = list({
  access: allowAll,
  
  fields: {
    region: relationship({ ref: 'Region.discountRegions' }),
    discount: relationship({ ref: 'Discount.discountRegions' })
  }
});
