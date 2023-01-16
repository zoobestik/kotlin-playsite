import type { AppProps, NextWebVitalsMetric } from 'next/app';
import Script from 'next/script';

import '../styles/globals.css';

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric);
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script id="no-js">
        {`document.body.classList.replace('no-js', 'js')`}
      </Script>
      <Component {...pageProps} />
    </>
  );
}
