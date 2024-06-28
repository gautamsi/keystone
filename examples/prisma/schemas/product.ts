
import { list } from '@keystone-6/core';
import { text,checkbox,integer,timestamp,json,select,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Product: Lists.Product = list({
  access: allowAll,
  
  fields: {
    title: text({  }),
    subtitle: text({  }),
    description: text({  }),
    handle: text({  }),
    isGiftcard: checkbox({ defaultValue: false }),
    thumbnail: text({  }),
    weight: integer({  }),
    length: integer({  }),
    height: integer({  }),
    width: integer({  }),
    hsCode: text({  }),
    originCountry: text({  }),
    midCode: text({  }),
    material: text({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  }),
    metadata: json({  }),
    discountable: checkbox({ defaultValue: true }),
    status: select({ options: [{ label: 'Draft', value: 'draft' },
{ label: 'Proposed', value: 'proposed' },
{ label: 'Published', value: 'published' },
{ label: 'Rejected', value: 'rejected' }], defaultValue: 'draft' }),
    externalId: text({  }),
    productCollection: relationship({ ref: 'ProductCollection.product' }),
    shippingProfile: relationship({ ref: 'ShippingProfile.product' }),
    productType: relationship({ ref: 'ProductType.product' }),
    discountConditionProduct: relationship({ ref: 'DiscountConditionProduct.product', many: true }),
    discountRuleProducts: relationship({ ref: 'DiscountRuleProduct.product', many: true }),
    productImages: relationship({ ref: 'ProductImage.product', many: true }),
    productOption: relationship({ ref: 'ProductOption.product', many: true }),
    productTags: relationship({ ref: 'ProductTag.product', many: true }),
    productTaxRate: relationship({ ref: 'ProductTaxRate.product', many: true }),
    productVariant: relationship({ ref: 'ProductVariant.product', many: true })
  }
});
