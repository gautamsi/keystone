
import { list } from '@keystone-6/core';
import { text,UNDEFINED__Float,timestamp,json,checkbox,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Region: Lists.Region = list({
  access: allowAll,
  
  fields: {
    name: text({  }),
    taxRate: UNDEFINED__Float({  }),
    taxCode: text({  }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    deletedAt: timestamp({  }),
    metadata: json({  }),
    giftCardsTaxable: checkbox({ defaultValue: true }),
    automaticTaxes: checkbox({ defaultValue: true }),
    currency: relationship({ ref: 'Currency.region' }),
    taxProvider: relationship({ ref: 'TaxProvider.region' }),
    cart: relationship({ ref: 'Cart.region', many: true }),
    country: relationship({ ref: 'Country.region', many: true }),
    discountRegions: relationship({ ref: 'DiscountRegion.region', many: true }),
    giftCard: relationship({ ref: 'GiftCard.region', many: true }),
    moneyAmount: relationship({ ref: 'MoneyAmount.region', many: true }),
    order: relationship({ ref: 'Order.region', many: true }),
    regionFulfillmentProviders: relationship({ ref: 'RegionFulfillmentProvider.region', many: true }),
    regionPaymentProviders: relationship({ ref: 'RegionPaymentProvider.region', many: true }),
    shippingOption: relationship({ ref: 'ShippingOption.region', many: true }),
    taxRateRegionTotaxRate: relationship({ ref: 'TaxRate.region', many: true })
  }
});
