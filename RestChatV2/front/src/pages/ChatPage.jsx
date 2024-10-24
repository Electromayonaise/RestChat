// ChatPage.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import Chat from '../components/Chat';
import ToggleThemeSwitch from '../components/ToggleThemeSwitch'; // Importa el toggle switch

const ChatPage = () => {
  const [username, setUsername] = useState('');
  const [receiver, setReceiver] = useState('');
  const [startChat, setStartChat] = useState(false);

  const handleStartChat = () => {
    if (username.trim() && receiver.trim()) {
      setStartChat(true);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4, position: 'relative' }}>
      {/* Posiciona el switch completamente a la derecha sin superponer */}
      <Box sx={{ position: 'fixed', top: 20, right: 20 }}>
        <ToggleThemeSwitch />
      </Box>

      {!startChat ? (
        <>
          {/* Contenedor principal con los inputs y el título */}
          <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontSize: '2rem', marginBottom: 4 }}>
              Bienvenido a Chat Pro
            </Typography>

            {/* Input de nombre */}
            <TextField
              label="Tu Nombre"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ '& .MuiInputBase-input': { fontSize: '1.2rem' } }}
            />

            {/* Input de usuario receptor */}
            <TextField
              label="Usuario con el que chatear"
              variant="outlined"
              fullWidth
              margin="normal"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              sx={{ '& .MuiInputBase-input': { fontSize: '1.2rem' } }}
            />

            {/* Botón de iniciar chat centrado */}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
              <Button variant="contained" onClick={handleStartChat} sx={{ fontSize: '1.2rem' }}>
                Iniciar Chat
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <Chat sender={username} receiver={receiver} />
      )}
    </Container>
  );
};

export default ChatPage;
