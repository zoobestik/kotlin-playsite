import cn from 'classnames';
import { PropsWithClassname } from '@/lib/reactTypes';

import Button from '@rescui/button';
import { ArrowTopRightIcon } from '@rescui/icons';

import { useTextStyles } from '@kotlin-site/typography';

import { Cards } from '@/pages/hands-on/list/data/cards';

import styles from './styles.module.css';

export type HandsOnListProps = PropsWithClassname & {
  list: Cards;
};

export function HandsOnList({ className, list }: HandsOnListProps) {
  const textCn = useTextStyles();
  return (
    <ul className={cn(className, styles.list)} data-test="hands-on-list">
      {list.map(({ title, description, url }) => (
        <li key={url}>
          <a
            href={url}
            className={styles.link}
            target="_blank"
            rel="noreferrer noopener"
            data-test="hands-on-list--link"
          >
            <h2 className={textCn('ktl-h3')}>{title}</h2>
            <p className={cn(textCn('ktl-text-2'), styles.text)}>
              {description}
            </p>
            <Button
              type="button"
              mode="outline"
              size="m"
              icon={<ArrowTopRightIcon />}
              iconPosition="right"
            >
              Start
            </Button>
          </a>
        </li>
      ))}
    </ul>
  );
}
