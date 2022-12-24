// @ts-check
import withBAInitializer from '@next/bundle-analyzer';

import {
  transpileKotlinWebSiteUi,
  transpileRescUI,
} from './transpilePackages.mjs';

/**  @type {import('next').NextConfig} */
export function createConfig() {
  const withBundleAnalyzer = withBAInitializer({
    enabled: process.env.ANALYZE === 'true',
  });

  const nextConfig = {
    // basePath: '',
    trailingSlash: true,
    reactStrictMode: true,
    transpilePackages: [...transpileKotlinWebSiteUi(), ...transpileRescUI()],
    pageExtensions: [
      'page.tsx',
      'page.ts' /*,'page.mjs', 'page.jsx', 'page.js'*/,
    ],
    // compiler: { reactRemoveProperties: true },
    // experimental: { appDir: true },
    eslint: {
      dirs: ['src', 'e2e', 'scripts'],
    },
  };

  return withBundleAnalyzer(nextConfig);
}
