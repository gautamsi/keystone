
import { list } from '@keystone-6/core';
import { checkbox,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const TaxProvider: Lists.TaxProvider = list({
  access: allowAll,
  
  fields: {
    isInstalled: checkbox({ defaultValue: true }),
    region: relationship({ ref: 'Region.taxProvider', many: true })
  }
});
