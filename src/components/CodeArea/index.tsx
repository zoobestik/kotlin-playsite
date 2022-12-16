import { ReactNode, useCallback } from 'react';

import Editor, {
  BeforeMount,
  OnChange as MonacoOnChange,
  OnMount,
  OnValidate,
} from '@monaco-editor/react';

import { editor } from 'monaco-editor';

import { CompilerOptions } from './CompilerOptions';
import { IDisplayOptions } from './IDisplayOptions';
import IStandaloneEditorConstructionOptions = editor.IStandaloneEditorConstructionOptions;

interface CodeAreaProps extends IDisplayOptions {
  Loader?: ReactNode;

  className?: string;

  compiler: CompilerOptions;

  code?: string;
  defaultCode?: string;

  onChange?: MonacoOnChange;
  onWillMount?: BeforeMount;
  onDidMount?: OnMount;
}

const DEFAULT_DISPLAY_OPTIONS: IDisplayOptions = {
  autoComplete: false,
  indent: 2,
  showLines: false,
  matchBrackets: false,
  theme: 'vs-dark',
};

function CodeAreaLoading() {
  return null;
}

export const CodeArea = ({
  className,
  Loader,

  code,
  defaultCode,

  onWillMount,
  onChange,
  onDidMount,

  ...props
}: CodeAreaProps & IDisplayOptions) => {
  const handleEditorChange = useCallback<MonacoOnChange>((value, event) => {
    console.log('onChange: the editor instance:', value, event);
    if (onChange) onChange(value, event);
  }, []);

  const handleEditorDidMount = useCallback<OnMount>((editor, monaco) => {
    console.log('DidMount: the editor instance:', editor, monaco);
    if (onDidMount) onDidMount(editor, monaco);
  }, []);

  const handleEditorWillMount = useCallback<BeforeMount>((monaco) => {
    console.log('WillMount: the monaco instance:', monaco);
    if (onWillMount) onWillMount(monaco);
  }, []);

  const handleEditorValidation = useCallback<OnValidate>((markers) => {
    console.log('onValidate: the markers:', markers);
  }, []);

  const { theme, indent, matchBrackets, showLines, autoComplete } = {
    ...DEFAULT_DISPLAY_OPTIONS,
    ...props,
  };

  const options: IStandaloneEditorConstructionOptions = {
    tabSize: indent,
    matchBrackets: matchBrackets ? 'always' : 'never',
    ...(autoComplete
      ? {}
      : {
          quickSuggestions: false,
          snippetSuggestions: 'none',
          wordBasedSuggestions: false,
        }),

    ...(showLines
      ? { lineNumbers: 'on' }
      : {
          lineNumbers: 'off',
          glyphMargin: false,
          folding: false,
          lineDecorationsWidth: 0,
          lineNumbersMinChars: 0,
        }),
  };

  return (
    <Editor
      loading={Loader || <CodeAreaLoading />}
      className={className}
      defaultLanguage="kotlin"
      defaultValue={defaultCode}
      theme={theme}
      value={code}
      options={options}
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
      beforeMount={handleEditorWillMount}
      onValidate={handleEditorValidation}
    />
  );
};
