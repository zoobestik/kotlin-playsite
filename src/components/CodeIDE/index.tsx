import { DEFAULT_SETTINGS, Provider } from './context';

export const CodeIDEProvider = Provider;

export function CodeIDE() {
  return <CodeIDEProvider value={DEFAULT_SETTINGS} />;
}
