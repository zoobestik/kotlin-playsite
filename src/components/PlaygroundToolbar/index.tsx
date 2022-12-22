import { PlatformsSelect } from '@/components/PlaygroundToolbar/PlatformsSelect';
import { ToolbarControls } from '@/components/PlaygroundToolbar/ToolbarControls';
import { VersionSelect } from '@/components/PlaygroundToolbar/VersionSelect';

import styles from './index.module.css';

export function PlaygroundToolbar() {
  return (
    <div className={styles.toolbar}>
      <VersionSelect />
      <PlatformsSelect />
      <ToolbarControls />
    </div>
  );
}
