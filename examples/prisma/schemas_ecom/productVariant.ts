
import { list } from '@keystone-6/core';
import { text,integer,checkbox,timestamp,json,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const ProductVariant: Lists.ProductVariant = list({
  access: allowAll,
  
  fields: {
    title: text({  }),
    sku: text({  }),
    barcode: text({  }),
    ean: text({  }),
    upc: text({  }),
    inventoryQuantity: integer({  }),
    allowBackorder: checkbox({ defaultValue: false }),
    manageInventory: checkbox({ defaultValue: true }),
    hsCode: text({  }),
    originCountry: text({  }),
    midCode: text({  }),
    material: text({  }),
    weight: integer({  }),
    length: integer({  }),
    height: integer({  }),
    width: integer({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  }),
    metadata: json({  }),
    variantRank: integer({ defaultValue: 0 }),
    product: relationship({ ref: 'Product.productVariant' }),
    claimItem: relationship({ ref: 'ClaimItem.productVariant', many: true }),
    lineItem: relationship({ ref: 'LineItem.productVariant', many: true }),
    moneyAmount: relationship({ ref: 'MoneyAmount.productVariant', many: true }),
    productOptionValue: relationship({ ref: 'ProductOptionValue.productVariant', many: true })
  }
});
