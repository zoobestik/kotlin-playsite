import { useMemo } from 'react';

import { NativeSelect } from '@rescui/select';
import { SelectOption } from '@rescui/select/lib/types';

import {
  useCodeIDESettings,
  useCodeIDEVersions,
} from '@/components/CodeIDE/context';

export function VersionSelect() {
  const versions = useCodeIDEVersions();
  const { version } = useCodeIDESettings();

  const options = useMemo<SelectOption[]>(
    () =>
      versions.map((ver: string) => ({
        label: ver,
        value: ver,
      })),
    [versions],
  );

  const value = useMemo<SelectOption>(
    () => options.find(({ value }) => value === version) || options[0],
    [options, version],
  );

  return (
    <NativeSelect
      size="s"
      placeholder="Select kotlin version..."
      options={options}
      value={value}
    />
  );
}
