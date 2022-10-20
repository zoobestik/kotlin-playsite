import { ReactNode } from 'react';

import styles from './styles.module.css';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <header></header>
      <main className={styles.main}>{children}</main>
      <footer></footer>
    </>
  );
};
