import { CodeArea } from '@/components/CodeArea';
import { CompilerPlatforms } from '@/components/CodeArea/CompilerPlatforms';

const Pane = () => <></>;

const DEFAULT_COMPILER_OPTIONS = {
  platform: CompilerPlatforms.JAVA,
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
