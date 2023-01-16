import { Layout } from '@/components/Layout';
import { CodeIDE } from '@/components/CodeIDE';

export default function HomePage() {
  return (
    <Layout
      theme="dark"
      component={CodeIDE}
      title={'Kotlin Playground: Edit, Run, Share Kotlin Code Online'}
    />
  );
}
