import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, language, onChange, currentLine }) => {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Configure editor theme
    monaco.editor.defineTheme('customDark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955' },
        { token: 'keyword', foreground: 'C586C0' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
      ],
      colors: {
        'editor.background': '#1a1a2e',
        'editor.foreground': '#ffffff',
        'editorLineNumber.foreground': '#858585',
        'editor.selectionBackground': '#264f78',
        'editor.lineHighlightBackground': '#2a2a4a',
      }
    });
    
    monaco.editor.setTheme('customDark');
  };

  useEffect(() => {
    if (editorRef.current && currentLine) {
      // Highlight current line
      editorRef.current.deltaDecorations([], [
        {
          range: new editorRef.current.getModel().monaco.Range(currentLine, 1, currentLine, 1),
          options: {
            isWholeLine: true,
            className: 'current-line-highlight',
            glyphMarginClassName: 'current-line-glyph'
          }
        }
      ]);
      
      // Scroll to current line
      editorRef.current.revealLineInCenter(currentLine);
    }
  }, [currentLine]);

  const getLanguageMode = (lang) => {
    const modes = {
      python: 'python',
      javascript: 'javascript',
      cpp: 'cpp',
      java: 'java'
    };
    return modes[lang] || 'plaintext';
  };

  return (
    <motion.div 
      className="h-96 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Editor
        height="100%"
        language={getLanguageMode(language)}
        value={code}
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: 'on',
          theme: 'customDark',
          padding: { top: 16, bottom: 16 }
        }}
      />
      
      <style jsx>{`
        .current-line-highlight {
          background: rgba(255, 255, 0, 0.1) !important;
          border-left: 3px solid #ffd700 !important;
        }
        .current-line-glyph {
          background: #ffd700 !important;
          width: 4px !important;
        }
      `}</style>
    </motion.div>
  );
};

export default CodeEditor;