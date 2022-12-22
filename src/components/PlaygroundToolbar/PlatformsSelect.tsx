import { useMemo } from 'react';
import { Select } from '@rescui/select';

import { Platform } from '@/lib/compiler/Platform';

import { useCodeIDESettings } from '@/components/CodeIDE/context';

const options = Object.values(Platform).map((platform) => ({
  label: platform.toUpperCase(),
  value: platform,
}));

export function PlatformsSelect() {
  const { platform } = useCodeIDESettings();

  const value = useMemo(
    () => options.find((option) => option.value === platform) || options[0],
    [platform],
  );

  return (
    <Select
      size="s"
      placeholder="Select platform version..."
      value={value}
      options={options}
    />
  );
}
