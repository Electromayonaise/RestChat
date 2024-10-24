// App.js
import React from 'react';
import { CssBaseline } from '@mui/material';
import ChatPage from './pages/ChatPage';
import ThemeContextProvider from './context/ThemeContext'; // Importar el ThemeContext

const App = () => {
  return (
    <ThemeContextProvider>
      <CssBaseline />
      <ChatPage />
    </ThemeContextProvider>
  );
};

export default App;
