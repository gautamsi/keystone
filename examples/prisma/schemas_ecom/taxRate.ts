
import { list } from '@keystone-6/core';
import { UNDEFINED__Float,text,timestamp,json,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const TaxRate: Lists.TaxRate = list({
  access: allowAll,
  
  fields: {
    rate: UNDEFINED__Float({  }),
    code: text({  }),
    name: text({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    metadata: json({  }),
    region: relationship({ ref: 'Region.taxRateRegionTotaxRate' }),
    productTaxRate: relationship({ ref: 'ProductTaxRate.taxRate', many: true }),
    productTypeTaxRate: relationship({ ref: 'ProductTypeTaxRate.taxRate', many: true }),
    shippingTaxRate: relationship({ ref: 'ShippingTaxRate.taxRate', many: true })
  }
});
