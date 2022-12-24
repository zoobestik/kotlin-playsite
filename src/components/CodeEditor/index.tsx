import { Platform } from '@/lib/compiler/Platform';
import { IJVMPlatformSettings } from '@/lib/compiler/PlatformSettings';
import { CodeArea } from '@/components/CodeArea';

const Pane = () => <></>;

const DEFAULT_COMPILER_OPTIONS: IJVMPlatformSettings = {
  platform: Platform.JAVA,
  version: '1.7.20',
};

const DEFAULT_CODE = `fun sum(a: Int, b: Int): Int {
    return a + b
}

fun main() {
    print("sum of 3 and 5 is $ws")
    println(sum(3, 5))
}`.trim();

export const CodeEditor = () => {
  return (
    <>
      <Pane />
      <CodeArea
        compiler={DEFAULT_COMPILER_OPTIONS}
        defaultCode={DEFAULT_CODE}
      />
    </>
  );
};
