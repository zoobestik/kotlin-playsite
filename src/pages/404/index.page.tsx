import Link from 'next/link';
import { Layout } from '@/components/Layout';

function Page404Content() {
  return (
    <div className="ktl-layout">
      <h1>404 - Page Not Found</h1>
      <Link href="/">Go back home</Link>
    </div>
  );
}

export default function Page404() {
  return <Layout title="not found" component={Page404Content} />;
}
