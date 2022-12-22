import { env } from 'process';
import { ComponentType } from 'react';

import { useRouter } from 'next/router';
import Head from 'next/head';

import { PropWithClassname } from '@/lib/reactTypes';

import Header, { PLAY_TITLE } from '@kotlin-site/header';
import Footer from '@kotlin-site/footer';

import styles from './styles.module.css';

type LayoutProps = {
  title?: string;
  description?: string;
  theme?: 'light' | 'dark';
  component: ComponentType<PropWithClassname>;
  footer?: boolean;
};

const searchConfig = {
  searchAlgoliaId: env.SEARCH_ALGOLIA_ID,
  searchAlgoliaApiKey: env.SEARCH_ALGOLIA_API_KEY,
  searchAlgoliaIndexName: env.SEARCH_ALGOLIA_INDEX_NAME,
};

export function Layout({
  title,
  description,
  component: Component,
  theme = 'dark',
  footer = true,
}: LayoutProps) {
  const { pathname } = useRouter();

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
      {footer && <Footer className="data-test-global-footer" />}
    </div>
  );
}
