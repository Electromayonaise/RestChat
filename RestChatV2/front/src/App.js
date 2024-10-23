import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import ChatPage from './pages/ChatPage';

const theme = createTheme({
  palette: {
    primary: {
      light: '#64b5f6',
      main: '#2196f3',
      dark: '#1976d2',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff4081',
      main: '#f50057',
      dark: '#c51162',
      contrastText: '#fff',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ChatPage />
    </ThemeProvider>
  );
};

export default App;
