import { ReactNode } from 'react';

import Header from '@jetbrains/kotlin-web-site-ui/out/components/header';
import Footer from '@jetbrains/kotlin-web-site-ui/out/components/footer';

import styles from './styles.module.css';

type LayoutProps = {
  children: ReactNode;
  footer?: boolean;
};

export const Layout = ({ children, footer = true }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <Header searchConfig={{ searchAlgoliaId: '' }} />
      <main className={styles.main}>{children}</main>
      {footer && <Footer />}
    </div>
  );
};
