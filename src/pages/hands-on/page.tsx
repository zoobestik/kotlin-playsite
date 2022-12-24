import cn from 'classnames';

import '@kotlin-site/layout';
import { useTextStyles } from '@kotlin-site/typography';

import { Cards } from '@/pages/hands-on/list/data/cards';
import { HandsOnList } from '@/pages/hands-on/list';

import styles from './page.module.css';

export type HandsOnListProps = {
  list: Cards;
};

export function HandsOnPage({ list }: HandsOnListProps) {
  const textCn = useTextStyles();
  return (
    <>
      <div className={cn(styles.section, 'ktl-layout ktl-layout--center')}>
        <h1 className={cn(textCn('ktl-h1'), styles.title)}>Kotlin Hands-On</h1>
        <p className={cn(styles.intro, textCn('ktl-text-1'))}>
          A series of hands-on labs where you can create applications with
          Kotlin using a variety of different technologies and targeting
          multiple platforms. The exercises are divided into a series of steps,
          walking you through each section.
        </p>
      </div>
      <div className={styles.wrapper}>
        <div className={cn(styles.section, 'ktl-layout ktl-layout--center')}>
          <HandsOnList className={styles.content} list={list} />
        </div>
      </div>
    </>
  );
}
