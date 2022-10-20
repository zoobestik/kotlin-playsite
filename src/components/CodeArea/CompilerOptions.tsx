import { CompilerPlatforms } from './CompilerPlatforms';

interface IBaseCommonOptions {
  platform: CompilerPlatforms;
  version: string;
  features?: {
    [key: string]: boolean | string;
  };
}

type IJVMFeatures = 'K2';

export interface IJVMCompilerOptions extends IBaseCommonOptions {
  platform: CompilerPlatforms.JAVA | CompilerPlatforms.JUNIT;
  args?: string[];
  features?: Partial<Record<IJVMFeatures, boolean>>;
}

type IJSFeatures = 'IR';

export interface IJSCompilerOptions extends IBaseCommonOptions {
  platform: CompilerPlatforms.JS | CompilerPlatforms.CANVAS;
  features?: Partial<Record<IJSFeatures, boolean>>;
}

export type CompilerOptions = IJVMCompilerOptions | IJSCompilerOptions;
