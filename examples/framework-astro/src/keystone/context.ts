import { getContext } from '@keystone-6/core/context'
import * as PrismaModule from 'myprisma'
import config from '../../keystone'
import type { Context } from '.keystone/types'

// Making sure multiple prisma clients are not created during hot reloading
export const keystoneContext: Context =
  (globalThis as any).keystoneContext || getContext(config, PrismaModule)

if (process.env.NODE_ENV !== 'production') {
  ;(globalThis as any).keystoneContext = keystoneContext
}
