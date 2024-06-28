
import { list } from '@keystone-6/core';
import { integer,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const FulfillmentItem: Lists.FulfillmentItem = list({
  access: allowAll,
  
  fields: {
    quantity: integer({  }),
    fulfillment: relationship({ ref: 'Fulfillment.fulfillmentItem' }),
    lineItem: relationship({ ref: 'LineItem.fulfillmentItem' })
  }
});
