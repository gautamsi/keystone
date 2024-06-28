
import { list } from '@keystone-6/core';
import { UNDEFINED__Float,text,timestamp,json,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const ShippingMethodTaxLine: Lists.ShippingMethodTaxLine = list({
  access: allowAll,
  
  fields: {
    rate: UNDEFINED__Float({  }),
    name: text({  }),
    code: text({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    metadata: json({  }),
    shippingMethod: relationship({ ref: 'ShippingMethod.shippingMethodTaxLine' })
  }
});
