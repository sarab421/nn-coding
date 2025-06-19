import React, { useEffect } from 'react';
import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Initialize Prism when component mounts
const initializePrism = () => {
  if (typeof window !== 'undefined' && window.Prism) {
    window.Prism.highlightAll();
  }
};

const TerminalPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#2d2d2d',
  color: '#fff',
  borderRadius: '8px',
  overflow: 'hidden',
  padding: '1.5rem',
  fontFamily: 'Consolas, Monaco, "Courier New", monospace',
}));

const TerminalHeader = styled(Typography)(({ theme }) => ({
  color: '#66ff66',
  fontSize: '1.2rem',
  marginBottom: '1rem',
  borderBottom: '1px solid #444',
  paddingBottom: '0.5rem',
}));

const TerminalCode = styled('div')(({ theme }) => ({
  backgroundColor: '#2d2d2d',
  borderRadius: '4px',
  padding: '1rem',
  overflowX: 'auto',
  fontSize: '0.9rem',
  '& pre': {
    margin: 0,
    padding: 0,
  },
}));

const CodeTerminal = ({ code, language = 'python' }) => {
  useEffect(() => {
    initializePrism();
  }, []);

  return (
    <TerminalPaper>
      <TerminalHeader variant="h6">
        Generated Code
      </TerminalHeader>
      <TerminalCode>
        <pre className={`language-${language} line-numbers`}>
          <code>{code}</code>
        </pre>
      </TerminalCode>
    </TerminalPaper>
  );
};

export default CodeTerminal;
