// @ts-check
import withBAInitializer from '@next/bundle-analyzer';
import CssoWebpackPlugin from 'csso-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

import {
  transpileKotlinWebSiteUi,
  transpileRescUI,
} from './transpilePackages.mjs';

/**  @type {import('next').NextConfig} */
export function createConfig() {
  const withBundleAnalyzer = withBAInitializer({
    enabled: process.env.ANALYZE === 'true',
  });

  /**  @type {import('next').NextConfig} */
  const nextConfig = {
    // basePath: '',
    trailingSlash: true,
    reactStrictMode: true,
    transpilePackages: [...transpileKotlinWebSiteUi(), ...transpileRescUI()],
    pageExtensions: [
      'page.tsx',
      'page.ts' /*,'page.mjs', 'page.jsx', 'page.js'*/,
    ],
    experimental: {
      // appDir: true,
      nextScriptWorkers: true,
    },
    // compiler: { reactRemoveProperties: true },
    eslint: {
      dirs: ['src', 'e2e', 'scripts'],
    },
    webpack: (config) => {
      config.plugins.push(new CssoWebpackPlugin.default());
      config.plugins.push(
        new CompressionPlugin({
          test: /\.js$|\.css$|\.html$/,
        }),
      );

      return { ...config };
    },
  };

  return withBundleAnalyzer(nextConfig);
}
