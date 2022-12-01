import fs from 'fs';
import Path from 'path';
import chokidar from 'chokidar';
import resolve from 'resolve';
import { cli } from '@keystone-6/core/scripts/cli';

export function getAdminPath(cwd: string) {
  return Path.join(cwd, '.keystone/admin');
}

function getDoesAdminAppExist() {
  try {
    const configPath = Path.join(process.cwd(), 'admin', 'app');
    resolve.sync(configPath, { extensions: ['.ts', '.tsx', '.js'], preserveSymlinks: false });
    return true;
  } catch (err: any) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return false;
    }
    throw err;
  }
}

async function run() {
  let watcher: chokidar.FSWatcher;

  const [command] = process.argv.slice(2);

  const nextApp = Path.resolve(`${getAdminPath(process.cwd())}/pages/_app.js`);

  const customAppExist = getDoesAdminAppExist();

  if (customAppExist) {
    if (['dev', 'build'].includes(command)) {
      if (fs.existsSync(nextApp)) {
        fs.unlinkSync(nextApp);
      }
      watcher = chokidar.watch(nextApp);
      watcher.on('add', path => {
        const data = fs.readFileSync(nextApp, 'utf8');
        const result = data.replace(`@keystone-6/core/___internal-do-not-use-will-break-in-patch/admin-ui/pages/App`, '../../../admin/app');
        fs.writeFileSync(nextApp, result, 'utf8');
        watcher.close();
      })
    }
  }
  await cli(process.cwd(), process.argv.slice(2)).catch(err => {
    // can not check instanceof ExitError, brute force to .code being numeric
    if (typeof err?.code === 'number') {
      process.exit(err.code);
    }
    console.log(err);
    process.exit(1);
  });
}

run();
