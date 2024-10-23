import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import Chat from './Chat';

const ChatInitializer = () => {
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [chatStarted, setChatStarted] = useState(false);

  const handleStartChat = () => {
    if (sender && receiver) {
      setChatStarted(true);
    }
  };

  return (
    <>
      {!chatStarted ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Tu Nombre"
            variant="outlined"
            onChange={(e) => setSender(e.target.value)}
            value={sender}
            sx={{ '& .MuiInputBase-input': { fontSize: '1.2rem' } }} // Aumentar tamaño de texto
          />
          <TextField
            label="Nombre del Compañero"
            variant="outlined"
            onChange={(e) => setReceiver(e.target.value)}
            value={receiver}
            sx={{ '& .MuiInputBase-input': { fontSize: '1.2rem' } }} // Aumentar tamaño de texto
          />
          <Button variant="contained" onClick={handleStartChat} sx={{ fontSize: '1.2rem' }}> {/* Aumentar tamaño de botón */}
            Iniciar Chat
          </Button>
        </Box>
      ) : (
        <Chat sender={sender} receiver={receiver} />
      )}
    </>
  );
};

export default ChatInitializer;
