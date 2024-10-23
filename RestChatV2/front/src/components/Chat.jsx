import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { Paper, Typography, Box, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';

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
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    const socket = new SockJS('http://localhost:8081/ws-connect');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        // Suscribirse al canal de mensajes del receptor
        stompClient.subscribe(`/messageTo/${receiver}`, (message) => {
          const msg = JSON.parse(message.body);
          // Solo agregar el mensaje si no es del mismo remitente
          if (msg.sender !== sender) {
            setMessages((prevMessages) => [
              ...prevMessages,
              msg,
            ]);
          }
        });
  
        // Suscribirse al canal de mensajes del remitente para recibir respuestas
        stompClient.subscribe(`/messageTo/${sender}`, (message) => {
          const msg = JSON.parse(message.body);
          // Solo agregar el mensaje si no es del mismo remitente
          if (msg.sender !== sender) {
            setMessages((prevMessages) => [
              ...prevMessages,
              msg,
            ]);
          }
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });
  
    stompClient.activate();
    setClient(stompClient);
  
    return () => {
      stompClient.deactivate();
    };
  }, [receiver, sender]);
  

  const sendMessage = () => {
    if (client && input.trim() !== '') {
      const msg = { sender, content: input, type: 'CHAT' };
      // Publicar el mensaje al servidor
      client.publish({
        destination: `/app/messageTo/${receiver}`,
        body: JSON.stringify(msg),
      });
      // Solo agregar el mensaje enviado a la lista de mensajes
      setMessages((prevMessages) => [...prevMessages, msg]);
      setInput('');
    }
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
        <Button variant="contained" onClick={sendMessage} sx={{ marginLeft: 1 }}>
          Enviar
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
