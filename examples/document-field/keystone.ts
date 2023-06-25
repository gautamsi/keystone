import { config } from '@keystone-6/core';
import { fixPrismaPath } from '../example-utils';
import { lists } from './schema';

export default config({
  db: {
    provider: 'postgresql',
    url: 'postgresql://postgres:postgrts@localhost/keystone-nextjs-auth-example',

    // WARNING: this is only needed for our monorepo examples, dont do this
    ...fixPrismaPath,
  },
  lists,
});
