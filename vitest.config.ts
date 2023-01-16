import { join } from 'path';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'jsdom',
  },
  resolve: {
    alias: [
      {
        find: /^~(.+)$/,
        replacement: join(process.cwd(), 'node_modules/$1'),
      },
    ],
  },
});
