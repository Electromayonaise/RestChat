import React, { useState } from 'react';
import { Paper, Typography, Box, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import useChat from '../hooks/useChat';

// Estilo para las burbujas de chat
const ChatBubble = styled(Paper)(({ theme, sender }) => ({
  margin: '5px',
  padding: '12px', // Aumentar el padding
  borderRadius: '10px',
  maxWidth: '70%',
  backgroundColor: sender ? theme.palette.primary.light : theme.palette.grey[700], // Cambiar a un gris más oscuro
  alignSelf: sender ? 'flex-end' : 'flex-start',
}));

const Chat = ({ sender, receiver }) => {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat(sender, receiver);

  const handleSendMessage = () => {
    sendMessage(input);
    setInput('');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', marginTop: 2 }}>
      <Typography variant="h4" gutterBottom> {/* Aumentar tamaño de la fuente */}
        Chat con {receiver}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', overflowY: 'auto', maxHeight: '400px', border: '1px solid #ccc', borderRadius: '5px', padding: 2 }}>
        {messages.map((msg, index) => (
          <ChatBubble key={index} sender={msg.sender === sender}>
            <Typography variant="body1" sx={{ fontSize: '1.2rem' }}> {/* Aumentar el tamaño de la fuente de los mensajes */}
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
          sx={{ flexGrow: 1, '& .MuiInputBase-input': { fontSize: '1.2rem' } }} // Aumentar tamaño de texto
          placeholder="Escribe un mensaje..."
        />
        <Button variant="contained" onClick={handleSendMessage} sx={{ marginLeft: 1, fontSize: '1.2rem' }}> {/* Aumentar tamaño de botón */}
          Enviar
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
