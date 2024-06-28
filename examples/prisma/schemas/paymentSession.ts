
import { list } from '@keystone-6/core';
import { text,checkbox,select,json,timestamp,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const PaymentSession: Lists.PaymentSession = list({
  access: allowAll,
  
  fields: {
    providerId: text({  }),
    isSelected: checkbox({  }),
    status: select({ options: [{ label: 'Authorized', value: 'authorized' },
{ label: 'Pending', value: 'pending' },
{ label: 'Requires More', value: 'requires_more' },
{ label: 'Error', value: 'error' },
{ label: 'Canceled', value: 'canceled' }],  }),
    data: json({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    idempotencyKey: text({  }),
    cart: relationship({ ref: 'Cart.paymentSession' })
  }
});
