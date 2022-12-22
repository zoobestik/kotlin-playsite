import type { NextPage } from 'next';

import { Layout } from '@/components/Layout';
import { CodeIDE } from '@/components/CodeIDE';

const Home: NextPage = () => {
  return (
    <>
      <Layout theme="dark" component={CodeIDE} />
    </>
  );
};

export default Home;
