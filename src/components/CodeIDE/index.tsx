import { ThemeProvider } from '@rescui/ui-contexts';

import { PropsWithClassname } from '@/lib/reactTypes';

import { Provider, DEFAULT_SETTINGS } from './context';

export const CodeIDEProvider = Provider;

export function CodeIDE({ className }: PropsWithClassname) {
  return (
    <ThemeProvider theme="dark">
      <CodeIDEProvider value={DEFAULT_SETTINGS}>
        <main className={className} />
      </CodeIDEProvider>
    </ThemeProvider>
  );
}
