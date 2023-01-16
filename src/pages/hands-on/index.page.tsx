import { useCallback } from 'react';
import { Layout } from '@/components/Layout';
import type { Cards } from '@/pages/hands-on/list/data/cards';
import { HandsOnPage } from '@/pages/hands-on/handsOnLayout';

type StaticPropsProps = {
  cards: Cards;
};

export async function getStaticProps(): Promise<{ props: StaticPropsProps }> {
  const { default: cards } = await import(
    '@/pages/hands-on/list/data/cards.json',
    { assert: { type: 'json' } }
  );

  return { props: { cards } };
}

export type HandsOnPageProps = StaticPropsProps;

export default function HandsOn({ cards }: HandsOnPageProps) {
  const Component = useCallback(() => <HandsOnPage list={cards} />, [cards]);

  return (
    <Layout
      title="Welcome to Kotlin hands-on"
      component={Component}
      footer={{ theme: 'dark' }}
    />
  );
}
