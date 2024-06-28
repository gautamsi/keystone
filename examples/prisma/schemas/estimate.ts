
import { list } from '@keystone-6/core';
import { integer,timestamp,text,decimal,bigInt,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Estimate: Lists.Estimate = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'Int' } },
  fields: {
    sequenceNumber: integer({  }),
    customerSequenceNumber: integer({  }),
    estimateDate: timestamp({  }),
    expiryDate: timestamp({  }),
    estimateNumber: text({  }),
    status: text({  }),
    referenceNumber: text({  }),
    taxPerItem: text({  }),
    discountPerItem: text({  }),
    notes: text({  }),
    discount: decimal({  }),
    discountType: text({  }),
    discountVal: bigInt({  }),
    subTotal: bigInt({  }),
    total: bigInt({  }),
    tax: bigInt({  }),
    uniqueHash: text({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    templateName: text({  }),
    exchangeRate: decimal({  }),
    baseDiscountVal: bigInt({  }),
    baseSubTotal: bigInt({  }),
    baseTotal: bigInt({  }),
    baseTax: bigInt({  }),
    salesTaxType: text({  }),
    salesTaxAddressType: text({  }),
    company: relationship({ ref: 'Company.estimates' }),
    user: relationship({ ref: 'User.estimates' }),
    currency: relationship({ ref: 'Currency.estimates' }),
    customer: relationship({ ref: 'Customer.estimates' }),
    estimateItems: relationship({ ref: 'EstimateItem.estimate', many: true }),
    taxes: relationship({ ref: 'Tax.estimate', many: true })
  }
});
