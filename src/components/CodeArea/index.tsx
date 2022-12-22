import { PlatformSettings } from '@/lib/compiler/PlatformSettings';

import { IDisplayOptions } from './IDisplayOptions';

interface CodeAreaProps extends IDisplayOptions {
  className?: string;

  compiler: PlatformSettings;

  code?: string;
  defaultCode?: string;
}

export const CodeArea = ({
  className,

  code,
  defaultCode,

  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  ...props // @ToDo: pass props to node
}: CodeAreaProps & IDisplayOptions) => {
  return (
    <textarea
      className={className}
      value={code}
      defaultValue={defaultCode}
    ></textarea>
  );
};
