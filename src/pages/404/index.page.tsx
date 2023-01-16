import { Layout } from '@/components/Layout';
import { Page404Content } from './Page404Content';

import styles from './index.module.css';

export default function Page404() {
  return (
    <Layout
      title="Welcome to Kotlin hands-on"
      component={Page404Content}
      className={styles.root}
      footer={{ theme: 'dark' }}
    />
  );
}
