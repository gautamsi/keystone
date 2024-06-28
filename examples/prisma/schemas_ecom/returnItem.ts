
import { list } from '@keystone-6/core';
import { integer,checkbox,json,text,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const ReturnItem: Lists.ReturnItem = list({
  access: allowAll,
  
  fields: {
    quantity: integer({  }),
    isRequested: checkbox({ defaultValue: true }),
    requestedQuantity: integer({  }),
    receivedQuantity: integer({  }),
    metadata: json({  }),
    note: text({  }),
    return: relationship({ ref: 'Renamedreturn.returnItem' }),
    lineItem: relationship({ ref: 'LineItem.returnItem' }),
    returnReason: relationship({ ref: 'ReturnReason.returnItem' })
  }
});
