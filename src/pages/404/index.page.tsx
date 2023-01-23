import { Layout } from '@/components/Layout';
import { Page404Content } from './Page404Content';

import styles from './index.module.css';

export default function Page404() {
  return (
    <Layout
      title="Kotlin Playground: Edit, Run, Share Kotlin Code Online"
      component={Page404Content}
      className={styles.root}
      footer={{ theme: 'dark' }}
    />
  );
}
