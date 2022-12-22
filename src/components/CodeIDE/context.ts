import { createContext, useContext } from 'react';

import { PlatformSettings } from '@/lib/compiler/PlatformSettings';
import { KotlinVersion } from '@/lib/compiler/KotlinVersion';
import { Platform } from '@/lib/compiler/Platform';

export interface ICodeIDEContext {
  settings: PlatformSettings;
  versions: KotlinVersion[];
}

export const DEFAULT_SETTINGS: Readonly<ICodeIDEContext> = {
  settings: {
    version: '1.7.20',
    platform: Platform.JAVA,
    args: [],
    features: {
      K2: false,
    },
  },
  versions: [],
};

const CodeIDEContext = createContext<ICodeIDEContext>(DEFAULT_SETTINGS);

CodeIDEContext.displayName = 'CodeIDEContext';

export const Provider = CodeIDEContext.Provider;

export function useCodeIDE() {
  return useContext(CodeIDEContext);
}

export function useCodeIDESettings() {
  return useCodeIDE().settings;
}

export function useCodeIDEVersions() {
  return useContext(CodeIDEContext).versions;
}
