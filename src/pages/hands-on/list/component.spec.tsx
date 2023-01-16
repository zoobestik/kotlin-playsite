import { expect, test } from '@playwright/experimental-ct-react';
import { LoremSize, text } from '@/utils/specs/lorem';
import { assertClassContains } from '@/utils/specs/asserts/common';
import { assertComponentSnapshot } from '@/utils/specs/asserts/snapshot';

import { HandsOnList } from './index';

function getCardsList() {
  return [
    {
      title: text(27),
      description: text(LoremSize.TWO_PARA),
      url: 'https://example1.com/',
    },
    {
      title: text(50),
      description: text(800),
      url: 'https://example2.com/',
    },
    {
      title: text(50),
      description: text(LoremSize.PARA),
      url: 'https://example3.com/',
    },
    ...new Array(4).fill({
      title: text(15),
      description: text(20),
      url: 'https://example.com/',
    }),
  ];
}

test('render', async ({ mount }) => {
  const randomClass = `class-${Math.random().toString().replace(/\./g, '')}`;

  const component = await mount(
    <HandsOnList className={randomClass} list={getCardsList()} />,
  );

  const items = component.getByTestId('hands-on-list--link');

  await assertClassContains(component, randomClass);
  await expect(items).toHaveCount(7);

  const cards = getCardsList();
  const links = await items.all();

  for (let i = 0, length = await items.count(); i < length; i++) {
    const link = links[i];
    const card = cards[i];

    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noreferrer noopener');
    await expect(link.locator('> h2').first()).toHaveText(card.title);
    await expect(link.locator('> p').first()).toHaveText(card.description);
    await expect(link).toHaveAttribute('href', card.url);
  }

  await items.first().hover();
  await assertComponentSnapshot(component, 'initial.png');
});
