import { list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'
import { checkbox, text } from '@keystone-6/core/fields'

import { type Lists } from '.keystone/types'

export const lists = {
  Post: list({
    access: allowAll,
    fields: {
      title: text(),
      content: text(),
      draft: checkbox(),
    },
  }),
} satisfies Lists
