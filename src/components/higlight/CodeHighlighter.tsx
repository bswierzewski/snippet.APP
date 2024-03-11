interface CodeHighlighterProps {
  code: string;
}

const CodeHighlighter: React.FC<CodeHighlighterProps> = ({ code }) => {
  return (
    <pre>
      <code>{code}</code>
    </pre>
  );
};

export default CodeHighlighter;
