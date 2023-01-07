// @ts-check
import { env } from 'process';

import withBAInitializer from '@next/bundle-analyzer';
import CssoWebpackPlugin from 'csso-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

import {
  transpileKotlinWebSiteUi,
  transpileRescUI,
} from './transpilePackages.mjs';

import redirects from './redirects.mjs';

const isDevMode = process.env.NODE_ENV === 'development';
const isE2EMode = !env.E2E;

/**  @type {import('next').NextConfig} */
export function createConfig(phase) {
  const isExport = phase === 'phase-export';

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
      // optimizeCss: {
      //   pruneSource: true,
      //   mergeStylesheets: true,
      // },
      newNextLinkBehavior: true,
    },
    compiler: {
      // The regexes defined here are processed in Rust so the syntax is different from
      // JavaScript `RegExp`s. See https://docs.rs/regex.
      reactRemoveProperties: !(isDevMode || isE2EMode)
        ? { properties: ['^data-test.*$'] }
        : false,
    },
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
    redirects: !isExport ? redirects : null,
  };

  return withBundleAnalyzer(nextConfig);
}
