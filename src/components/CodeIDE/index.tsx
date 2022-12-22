import { ThemeProvider } from '@rescui/ui-contexts';

import { PropWithClassname } from '@/lib/reactTypes';

import { PlaygroundToolbar } from '@/components/PlaygroundToolbar';
import { CodeEditor } from '@/components/CodeEditor';

import { Provider, DEFAULT_SETTINGS } from './context';

export const CodeIDEProvider = Provider;

export function CodeIDE({ className }: PropWithClassname) {
  return (
    <ThemeProvider theme="dark">
      <CodeIDEProvider value={DEFAULT_SETTINGS}>
        <main className={className}>
          <PlaygroundToolbar />
          <CodeEditor />
        </main>
      </CodeIDEProvider>
    </ThemeProvider>
  );
}
