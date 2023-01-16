import { cwd } from 'process';
import { join } from 'path';
import { constants as FS_CONSTANTS, promises as fs } from 'fs';

const pagesDir = join(cwd(), 'src', 'pages');

async function getPagesRedirect() {
  console.log('Collect redirects from pages...');

  const pages = await fs.readdir(pagesDir, { withFileTypes: true });

  const list = await Promise.all(
    pages.map(async (file) => {
      if (file.isDirectory()) {
        const pageName = file.name;
        const redirectsPath = join(pagesDir, pageName, '_redirects.mjs');

        try {
          await fs.access(redirectsPath, FS_CONSTANTS.R_OK);

          const { default: redirects } = await import(redirectsPath);

          const result = Object.entries(redirects).map(([part, url]) => [
            `/${pageName}/${part}`,
            url,
          ]);

          console.log(`  ${pageName} - imported.`);

          return result;
        } catch (e) {
          if (e.code !== 'ENOENT') throw e;
          console.log(`  ${pageName} - skip page...`);
        }
      }

      return [];
    }),
  );

  return list.flat();
}

export default async function getRedirect() {
  const pagesLinks = await getPagesRedirect();

  return pagesLinks.map(([source, destination]) => ({
    source: encodeURI(source),
    destination,
    permanent: true,
  }));
}
