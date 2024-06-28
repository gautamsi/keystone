
import { list } from '@keystone-6/core';
import { text,integer,json,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const LineItemAdjustment: Lists.LineItemAdjustment = list({
  access: allowAll,
  
  fields: {
    description: text({  }),
    amount: integer({  }),
    metadata: json({  }),
    discount: relationship({ ref: 'Discount.lineItemAdjustment' }),
    lineItem: relationship({ ref: 'LineItem.lineItemAdjustment' })
  }
});
