import fs from 'node:fs/promises'
import next from 'next'
import {
  createSystem,
  getBuiltKeystoneConfigurationPath,
  getBuiltKeystoneConfiguration,
} from '../lib/createSystem'
import { createExpressServer } from '../lib/createExpressServer'
import { createAdminUIMiddlewareWithNextApp } from '../lib/createAdminUIMiddleware'
import { runMigrationsOnDatabase } from '../lib/migrations'
import { ExitError } from './utils'
import { type Flags } from './cli'

export async function start (
  cwd: string,
  { server, ui, withMigrations }: Pick<Flags, 'server' | 'ui' | 'withMigrations'>
) {
  console.log('✨ Starting Keystone')

  // TODO: this cannot be changed for now, circular dependency with getSystemPaths, getEsbuildConfig
  const builtConfigPath = getBuiltKeystoneConfigurationPath(cwd)

  // this is the compiled version of the configuration which was generated during the build step
  if (!(await fs.stat(builtConfigPath).catch(() => null))) {
    console.error('🚨 keystone build must be run before running keystone start')
    throw new ExitError(1)
  }

  const system = createSystem(getBuiltKeystoneConfiguration(cwd))
  const paths = system.getPaths(cwd)

  if (withMigrations) {
    console.log('✨ Applying any database migrations')
    const migrations = await runMigrationsOnDatabase(cwd, system)
    console.log(migrations.length === 0 ? `✨ No database migrations to apply` : `✨ Database migrated`)
  }

  if (!server) return

  const prismaClient = require(paths.prisma)
  const keystone = system.getKeystone(prismaClient)

  console.log('✨ Connecting to the database')
  await keystone.connect()

  console.log('✨ Creating server')
  const { expressServer, httpServer } = await createExpressServer(system.config, keystone.context)

  console.log(`✅ GraphQL API ready`)
  if (!system.config.ui?.isDisabled && ui) {
    console.log('✨ Preparing Admin UI Next.js app')
    const nextApp = next({ dev: false, dir: cwd })
    await nextApp.prepare()

    expressServer.use(await createAdminUIMiddlewareWithNextApp(system.config, keystone.context, nextApp))
    console.log(`✅ Admin UI ready`)
  }

  const httpOptions = system.config.server.options

  // prefer env.PORT
  if ('PORT' in process.env) {
    httpOptions.port = parseInt(process.env.PORT || '')
  }

  // prefer env.HOST
  if ('HOST' in process.env) {
    httpOptions.host = process.env.HOST || ''
  }

  httpServer.listen(system.config.server.options, (err?: any) => {
    if (err) throw err

    const easyHost = [undefined, '', '::', '0.0.0.0'].includes(httpOptions.host)
      ? 'localhost'
      : httpOptions.host

    console.log(`⭐️ Server listening on ${httpOptions.host || ''}:${httpOptions.port} (http://${easyHost}:${httpOptions.port}/)`)
  })
}
