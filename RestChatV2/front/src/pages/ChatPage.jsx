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
          <Typography variant="h4" gutterBottom>
            Bienvenido a la Aplicación de Chat
          </Typography>
          <TextField
            label="Tu Nombre"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Usuario con el que chatear"
            variant="outlined"
            fullWidth
            margin="normal"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />
          <Button variant="contained" onClick={handleStartChat}>
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
