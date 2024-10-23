// src/hooks/useChat.js

import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const useChat = (sender, receiver) => {
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);

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
            setMessages((prevMessages) => [...prevMessages, msg]);
          }
        });

        // Suscribirse al canal de mensajes del remitente para recibir respuestas
        stompClient.subscribe(`/messageTo/${sender}`, (message) => {
          const msg = JSON.parse(message.body);
          // Solo agregar el mensaje si no es del mismo remitente
          if (msg.sender !== sender) {
            setMessages((prevMessages) => [...prevMessages, msg]);
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

  const sendMessage = (input) => {
    if (client && input.trim() !== '') {
      const msg = { sender, content: input, type: 'CHAT' };
      // Publicar el mensaje al servidor
      client.publish({
        destination: `/app/messageTo/${receiver}`,
        body: JSON.stringify(msg),
      });
      // Solo agregar el mensaje enviado a la lista de mensajes
      setMessages((prevMessages) => [...prevMessages, msg]);
    }
  };

  return { messages, sendMessage };
};

export default useChat;
