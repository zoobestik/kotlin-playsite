import cn from 'classnames';
import Link from 'next/link';
import { useTextStyles } from '@kotlin-site/typography';

import '@kotlin-site/layout';
import styles from './Page404Content.module.css';

export function Page404Content() {
  const textCn = useTextStyles();
  return (
    <section
      className={cn(
        styles.layout,
        'ktl-layout',
        'ktl-layout--center',
        'ktl-layout--spacing',
      )}
    >
      <div className={styles.content}>
        <h1 className={textCn('ktl-h1')}>Uh-Oh!</h1>
        <p className={cn(styles.para, textCn('ktl-h2'))}>
          You surely know what this means.
        </p>
        <p className={textCn('ktl-text-2')}>
          We can&apos;t find the page you&apos;re looking for. Please try
          starting from{' '}
          <Link data-test="page404-backlink" href="/">
            home
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
