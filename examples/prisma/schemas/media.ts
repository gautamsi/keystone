
import { list } from '@keystone-6/core';
import { text, bigInt, integer, timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Media: Lists.Media = list({
  access: allowAll,
  db: { idField: { kind: 'autoincrement', type: 'BigInt' } },
  graphql: { plural: 'MediaFiles' },
  fields: {
    modelType: text({}),
    modelId: bigInt({}),
    collectionName: text({}),
    name: text({}),
    fileName: text({}),
    mimeType: text({}),
    disk: text({}),
    size: integer({}),
    manipulations: text({}),
    customProperties: text({}),
    responsiveImages: text({}),
    orderColumn: integer({}),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    uuid: text({}),
    conversionsDisk: text({})
  }
});
