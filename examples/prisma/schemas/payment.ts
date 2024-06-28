
import { list } from '@keystone-6/core';
import { integer,text,json,timestamp,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Payment: Lists.Payment = list({
  access: allowAll,
  
  fields: {
    amount: integer({  }),
    amountRefunded: integer({ defaultValue: 0 }),
    providerId: text({  }),
    data: json({  }),
    capturedAt: timestamp({  }),
    canceledAt: timestamp({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    metadata: json({  }),
    idempotencyKey: text({  }),
    cartCartTopaymentCartId: relationship({ ref: 'Cart.paymentCartTopaymentCartId' }),
    swap: relationship({ ref: 'Swap.payment' }),
    currency: relationship({ ref: 'Currency.payment' }),
    order: relationship({ ref: 'Order.payment' }),
    cartCartPaymentIdTopayment: relationship({ ref: 'Cart.paymentCartPaymentIdTopayment' })
  }
});
