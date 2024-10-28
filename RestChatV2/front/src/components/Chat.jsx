import React, { useState, useContext, useEffect } from 'react';
import { Paper, Typography, Box, TextField, Button, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import useChat from '../hooks/useChat';
import { ThemeContext } from '../context/ThemeContext';

const ChatBubble = styled(Paper)(({ theme, sender }) => ({
  margin: '5px',
  padding: '12px',
  borderRadius: '10px',
  maxWidth: '70%',
  backgroundColor: sender
    ? theme?.palette?.primary?.light || '#d1e7fd'
    : theme?.palette?.grey[400] || '#e0e0e0',
  alignSelf: sender ? 'flex-end' : 'flex-start',
}));

const Chat = ({ sender, receiver }) => {
  const [input, setInput] = useState('');
  const { messages, sendMessage, fetchMessages } = useChat(sender, receiver);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    fetchMessages(); // Carga el historial de mensajes al iniciar la conversación
  }, [receiver]);

  const handleSendMessage = () => {
    sendMessage(input);
    setInput('');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        marginTop: 2,
        bgcolor: darkMode ? 'background.default' : 'background.paper',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Chat con {receiver}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          overflowY: 'auto',
          maxHeight: '400px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          padding: 2,
          bgcolor: darkMode ? 'background.paper' : 'grey.200',
        }}
      >
        {messages.map((msg, index) => (
          <ChatBubble key={index} sender={msg.sender === sender}>
            <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
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
          sx={{ flexGrow: 1, '& .MuiInputBase-input': { fontSize: '1.2rem' } }}
          placeholder="Escribe un mensaje..."
        />
        <Button variant="contained" onClick={handleSendMessage} sx={{ marginLeft: 1, fontSize: '1.2rem' }}>
          Enviar
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
