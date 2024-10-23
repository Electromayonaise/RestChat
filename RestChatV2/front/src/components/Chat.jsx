// src/components/Chat.js

import React, { useState } from 'react';
import { Paper, Typography, Box, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import useChat from '../hooks/useChat'; // Importar el hook personalizado

// Estilo para las burbujas de chat
const ChatBubble = styled(Paper)(({ theme, sender }) => ({
  margin: '5px',
  padding: '10px',
  borderRadius: '10px',
  maxWidth: '60%',
  backgroundColor: sender ? theme.palette.primary.light : theme.palette.grey[300],
  alignSelf: sender ? 'flex-end' : 'flex-start',
}));

const Chat = ({ sender, receiver }) => {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat(sender, receiver); // Usar el hook personalizado

  const handleSendMessage = () => {
    sendMessage(input);
    setInput('');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', marginTop: 2 }}>
      <Typography variant="h6" gutterBottom>
        Chat con {receiver}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', overflowY: 'auto', maxHeight: '400px', border: '1px solid #ccc', borderRadius: '5px', padding: 2 }}>
        {messages.map((msg, index) => (
          <ChatBubble key={index} sender={msg.sender === sender}>
            <Typography variant="body1">
              <strong>{msg.sender}:</strong> {msg.content}
            </Typography>
          </ChatBubble>
        ))}
      </Box>
      <Box sx={{ display: 'flex', marginTop: 2 }}>
        <TextField
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{ flexGrow: 1 }}
          placeholder="Escribe un mensaje..."
        />
        <Button variant="contained" onClick={handleSendMessage} sx={{ marginLeft: 1 }}>
          Enviar
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
