import { readdirSync } from 'fs';
import { join } from 'path';

const PAGE_FILE_EXTENSIONS = ['.page.tsx'];

export function listPages(baseDir: string): string[] {
  const pages = [];
  const dirs: string[] = [baseDir];

  while (dirs.length) {
    const dir = dirs.pop();

    if (dir) {
      for (const file of readdirSync(dir, { withFileTypes: true })) {
        const path = join(dir, file.name);

        if (file.isDirectory()) {
          dirs.push(path);
          continue;
        }

        const pageExtension = PAGE_FILE_EXTENSIONS.find((ext) =>
          file.name.endsWith(ext),
        );

        if (pageExtension && file.name[0] !== '_' && file.isFile()) {
          const url =
            path.substring(baseDir.length, path.length - pageExtension.length) +
            '.html';
          pages.push(url.replace(/index.html$/, ''));
        }
      }
    }
  }

  return pages;
}
