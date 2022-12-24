import { ComponentType } from 'react';

import * as process from 'process';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { ThemeProvider } from '@rescui/ui-contexts';

import { PropsWithClassname, UITheme } from '@/lib/reactTypes';

import Header, { PLAY_TITLE } from '@kotlin-site/header';
import Footer from '@kotlin-site/footer';

import styles from './styles.module.css';

export type LayoutChildComponent = ComponentType<PropsWithClassname>;

export type FooterProps = {
  theme?: UITheme;
};

export type LayoutProps = {
  title?: string;
  description?: string;
  theme?: UITheme;
  component: LayoutChildComponent;
  footer?: boolean | FooterProps;
};

const searchConfig = {
  searchAlgoliaId: process.env.NEXT_PUBLIC_SEARCH_ALGOLIA_ID,
  searchAlgoliaApiKey: process.env.NEXT_PUBLIC_SEARCH_ALGOLIA_API_KEY,
  searchAlgoliaIndexName: process.env.NEXT_PUBLIC_SEARCH_ALGOLIA_INDEX_NAME,
};

export function Layout({
  title,
  description,
  component: Component,
  theme = 'dark',
  footer = true,
}: LayoutProps) {
  const { pathname } = useRouter();

  const { theme: footerTheme }: FooterProps =
    footer && footer !== true ? footer : {};

  return (
    <div className={styles.layout}>
      <Head>
        <title>
          {title || 'Kotlin Playground: Edit, Run, Share Kotlin Code Online'}
        </title>
        <meta name="description" content={description || ''} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        currentUrl={pathname}
        currentTitle={PLAY_TITLE}
        hasBorder={theme === 'light'}
        isPlayground
        hasSearch
        searchConfig={searchConfig}
        noScrollClassName={'_no-scroll'}
      />

      <Component className={styles.main} />

      {Boolean(footer) && (
        <ThemeProvider theme={footerTheme || 'dark'}>
          <Footer className="data-test-global-footer" />
        </ThemeProvider>
      )}
    </div>
  );
}
