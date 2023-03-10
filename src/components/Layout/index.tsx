import { ComponentType, useCallback } from 'react';
import cn from 'classnames';

import * as process from 'process';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { ThemeProvider } from '@rescui/ui-contexts';

import Header, { PLAY_TITLE } from '@kotlin-site/header';
import Footer from '@kotlin-site/footer';

import { UITheme } from '@/utils/react';

import styles from './styles.module.css';

export type FooterProps = {
  theme?: UITheme;
};

export type LayoutProps = {
  className?: string;
  title: string;
  description?: string;
  component: ComponentType;
  theme?: UITheme;
  sticky?: boolean;
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
  theme = 'light',
  sticky = true,
  footer = true,
  className,
}: LayoutProps) {
  const { basePath, pathname, push } = useRouter();

  const { theme: footerTheme }: FooterProps =
    footer && footer !== true ? footer : {};

  const checkUrlWithoutDomain = useCallback(
    (url: string) => `${basePath}${pathname}` === url,
    [basePath, pathname],
  );

  const internalNavigation = useCallback(
    (event: Event, url: string) => {
      if (url.startsWith('/')) {
        event.preventDefault();
        push(url);
      }
    },
    [push],
  );

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.layout}>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description || ''} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header
          className={cn({ [styles.headerSticky]: Boolean(sticky) })}
          currentUrl={pathname}
          currentTitle={PLAY_TITLE}
          hasBorder={theme === 'light'}
          isPlayground
          hasSearch
          searchConfig={searchConfig}
          linkHandler={internalNavigation}
          isUrlActive={checkUrlWithoutDomain}
        />

        <main
          className={cn(styles.main, className, styles[`main_theme_${theme}`])}
          data-test="page-content"
        >
          <Component />
        </main>

        {Boolean(footer) && (
          <ThemeProvider theme={footerTheme || 'dark'}>
            <Footer className="data-test-global-footer" />
          </ThemeProvider>
        )}
      </div>
    </ThemeProvider>
  );
}
