import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import CodeTerminal from './CodeTerminal';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  const [prompt, setPrompt] = useState('');
  const [showThinking, setShowThinking] = useState(false);
  const [thinkingProcess, setThinkingProcess] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setThinkingProcess('');
    setGeneratedCode('');

    try {
      const response = await axios.post('http://localhost:8000/api/generate_code', {
        prompt: prompt,
        show_thinking: showThinking
      });
      
      setThinkingProcess(response.data.thinking_process);
      setGeneratedCode(response.data.code);
    } catch (err) {
      setError('Error generating code. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Code Assistant
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Generate code using AI
          </Typography>
        </Box>

        <Paper sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Enter your prompt"
              variant="outlined"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              sx={{ mb: 3 }}
            />
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Switch
                checked={showThinking}
                onChange={(e) => setShowThinking(e.target.checked)}
                sx={{ mr: 1 }}
              />
              <Typography variant="body1">
                Show thinking process
              </Typography>
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading || !prompt.trim()}
              sx={{ mr: 1 }}
            >
              Generate Code
            </Button>
          </form>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {generatedCode && (
            <Box sx={{ mt: 3 }}>
              {showThinking && thinkingProcess && (
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Thinking Process
                  </Typography>
                  <pre style={{ whiteSpace: 'pre-wrap', overflowX: 'auto' }}>
                    {thinkingProcess}
                  </pre>
                </Paper>
              )}

              <CodeTerminal code={generatedCode} />
            </Box>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
