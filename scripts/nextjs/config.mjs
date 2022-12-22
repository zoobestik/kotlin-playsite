// @ts-check
import withBAInitializer from '@next/bundle-analyzer';

import {
  transpileRescUI,
  transpileKotlinWebSiteUi,
} from './transpile-packages.mjs';

/**  @type {import('next').NextConfig} */
export function createConfig() {
  const withBundleAnalyzer = withBAInitializer({
    enabled: process.env.ANALYZE === 'true',
  });

  /** @type {import('next').NextConfig} */
  const nextConfig = {
    reactStrictMode: true,
    transpilePackages: [...transpileKotlinWebSiteUi(), ...transpileRescUI()],
    // compiler: { reactRemoveProperties: true },
    // experimental: { appDir: true },
  };

  return withBundleAnalyzer(nextConfig);
}
