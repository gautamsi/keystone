
import { list } from '@keystone-6/core';
import { text,decimal,bigInt,timestamp,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const EstimateItem: Lists.EstimateItem = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'Int' } },
  fields: {
    name: text({  }),
    description: text({  }),
    discountType: text({  }),
    quantity: decimal({  }),
    unitName: text({  }),
    discount: decimal({  }),
    discountVal: bigInt({  }),
    price: bigInt({  }),
    tax: bigInt({  }),
    total: bigInt({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    exchangeRate: decimal({  }),
    baseDiscountVal: bigInt({  }),
    basePrice: bigInt({  }),
    baseTax: bigInt({  }),
    baseTotal: bigInt({  }),
    company: relationship({ ref: 'Company.estimateItems' }),
    estimate: relationship({ ref: 'Estimate.estimateItems' }),
    item: relationship({ ref: 'Item.estimateItems' }),
    taxes: relationship({ ref: 'Tax.estimateItem', many: true })
  }
});
