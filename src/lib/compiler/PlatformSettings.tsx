import { Platform } from './Platform';
import { KotlinVersion } from './KotlinVersion';

interface IBasePlatformSettings {
  platform: Platform;
  version: KotlinVersion;
  features?: {
    [key: string]: boolean | string;
  };
}

type IJVMFeatures = 'K2';

export interface IJVMPlatformSettings extends IBasePlatformSettings {
  platform: Platform.JAVA | Platform.JUNIT;
  args?: string[];
  features?: Partial<Record<IJVMFeatures, boolean>>;
}

type IJSFeatures = 'IR';

export interface IJSPlatformSettings extends IBasePlatformSettings {
  platform: Platform.JS | Platform.CANVAS;
  features?: Partial<Record<IJSFeatures, boolean>>;
}

export type PlatformSettings = IJVMPlatformSettings | IJSPlatformSettings;
