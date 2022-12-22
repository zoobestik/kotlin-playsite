import Button from '@rescui/button';
import { LoadingIcon, ShareIcon } from '@rescui/icons';

export function ToolbarControls() {
  const isLoading = false;

  return (
    <div>
      <Button
        icon={isLoading ? <LoadingIcon /> : <ShareIcon />}
        theme="dark"
        mode="clear"
      >
        Share code
      </Button>
    </div>
  );
}
