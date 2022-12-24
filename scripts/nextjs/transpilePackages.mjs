import { join } from 'path';
import { readdirSync } from 'fs';

import packageJson from '../../package-lock.json' assert { type: 'json' };

/** @type string[] */
function listDirs(source) {
  return readdirSync(source, { withFileTypes: true })
    .filter((file) => file.isDirectory())
    .map((dir) => dir.name);
}

const KWS_UI_PACKAGE = '@jetbrains/kotlin-web-site-ui';
const KWS_UI_PATH = 'out/components';

/** @type string[] */
export function transpileKotlinWebSiteUi() {
  const modulePrefix = join(KWS_UI_PACKAGE, KWS_UI_PATH);

  return listDirs(join(process.cwd(), 'node_modules', modulePrefix)).map(
    (name) => `${modulePrefix}/${name}`,
  );
}

/** @type string[] */
export function transpileRescUI() {
  return Object.keys(packageJson.packages)
    .map((it) => {
      const match = it.match(/^(node_modules\/)?(@rescui\/[^/]+)/);
      return (match && match[2]) || '';
    })
    .filter((it) => Boolean(it));
}
