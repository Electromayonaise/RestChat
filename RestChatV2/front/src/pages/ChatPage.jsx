import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import Chat from '../components/Chat';

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
    <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: 4 }}>
      {!startChat ? (
        <>
          <Typography variant="h4" gutterBottom sx={{ fontSize: '2rem' }}> {/* Aumentar tamaño de fuente */}
            Bienvenido a Chat Pro
          </Typography>
          <TextField
            label="Tu Nombre"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ '& .MuiInputBase-input': { fontSize: '1.2rem' } }} // Aumentar tamaño de texto
          />
          <TextField
            label="Usuario con el que chatear"
            variant="outlined"
            fullWidth
            margin="normal"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            sx={{ '& .MuiInputBase-input': { fontSize: '1.2rem' } }} // Aumentar tamaño de texto
          />
          <Button variant="contained" onClick={handleStartChat} sx={{ fontSize: '1.2rem' }}> {/* Aumentar tamaño de botón */}
            Iniciar Chat
          </Button>
        </>
      ) : (
        <Chat sender={username} receiver={receiver} />
      )}
    </Container>
  );
};

export default ChatPage;
