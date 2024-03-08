import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

interface CodeHighlighterProps {
  code: string;
}

const CodeHighlighter: React.FC<CodeHighlighterProps> = ({ code }) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.innerHTML = hljs.highlightAuto(code).value;
    }
  }, [code]);

  return (
    <pre>
      <code ref={codeRef} className="hljs">
        {/* Initial content will be replaced by highlighted code */}
      </code>
    </pre>
  );
};

export default CodeHighlighter;
