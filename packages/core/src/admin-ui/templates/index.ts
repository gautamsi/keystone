import { type GraphQLSchema } from 'graphql'
import {
  type __ResolvedKeystoneConfig
} from '../../types'
import { type AdminMetaRootVal } from '../../lib/create-admin-meta'
import { adminConfigTemplate, adminLayoutTemplate } from './app'
import { homeTemplate } from './home'
import { listTemplate } from './list'
import { itemTemplate } from './item'
import { noAccessTemplate } from './no-access'
import { createItemTemplate } from './create-item'

export function writeAdminFiles (config: __ResolvedKeystoneConfig,
  graphQLSchema: GraphQLSchema,
  adminMeta: AdminMetaRootVal,
  configFileExists: boolean
) {
  const ext = config.ui?.tsx ? 'tsx' : 'js'
  return [
    { mode: 'write', src: noAccessTemplate(config.session), outputPath: `no-access/page.${ext}` },
    { mode: 'write', src: adminLayoutTemplate(), outputPath: `layout.${ext}` },
    {
      mode: 'write',
      src: adminConfigTemplate(
        adminMeta,
        graphQLSchema,
        { configFileExists },
        config.graphql?.path || '/api/graphql',
        config.ui?.basePath?.replace(/\/$/, '') || ''
      ),
      outputPath: `.admin/index.${ext}`,
      overwrite: true,
    },
    { mode: 'write' as const, src: homeTemplate, outputPath: `page.${ext}` },
    { mode: 'write' as const, src: listTemplate, outputPath: `[listKey]/page.${ext}` },
    { mode: 'write' as const, src: itemTemplate, outputPath: `[listKey]/[id]/page.${ext}` },
    { mode: 'write' as const, src: createItemTemplate, outputPath: `[listKey]/create/page.${ext}` },
  ]
}
