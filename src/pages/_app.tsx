import type { AppProps, NextWebVitalsMetric } from 'next/app';

import '@rescui/colors/lib/index.css';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric);
}

export default MyApp;
