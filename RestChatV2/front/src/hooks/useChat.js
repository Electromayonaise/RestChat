import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import axios from 'axios';

const useChat = (sender, receiver) => {
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);

  useEffect(() => {
    // Obtener el historial de mensajes cada vez que cambie el receptor
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/chat?sender=${sender}&to=${receiver}`);
        const messagesData = response.data;
        if (Array.isArray(messagesData)) {
          setMessages(messagesData); // Actualiza el estado con los mensajes obtenidos
        } else {
          console.error("Response.messages is not an array:", messagesData);
          setMessages([]);
        }
      } catch (error) {
        console.error("Error al obtener el historial de mensajes:", error);
      }
    };

    // Llamar a la función para obtener los mensajes al cargar el componente
    fetchMessages();

    // Configuración del cliente WebSocket
    const socket = new SockJS('http://localhost:8081/ws-connect');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        // Suscribirse al canal de mensajes del receptor
        stompClient.subscribe(`/messageTo/${receiver}`, (message) => {
          const msg = JSON.parse(message.body);
          if (msg.sender !== sender) {
            setMessages((prevMessages) => [...prevMessages, msg]);
          }
        });

        // Suscribirse al canal de mensajes del remitente
        stompClient.subscribe(`/messageTo/${sender}`, (message) => {
          const msg = JSON.parse(message.body);
          if (msg.sender !== sender) {
            setMessages((prevMessages) => [...prevMessages, msg]);
          }
        });
      },
      onStompError: (frame) => {
        console.error('Error en STOMP:', frame.headers['message']);
        console.error('Detalles adicionales:', frame.body);
      },
    });

    stompClient.activate();
    setClient(stompClient);

    // Desactivar WebSocket cuando el componente se desmonte
    return () => {
      stompClient.deactivate();
    };
  }, [receiver, sender]); // Escuchar cambios en receiver y sender para actualizar los mensajes

  const sendMessage = (input) => {
    if (client && input.trim() !== '') {
      const msg = { sender, content: input, type: 'CHAT' };
      client.publish({
        destination: `/app/messageTo/${receiver}`,
        body: JSON.stringify(msg),
      });
      setMessages((prevMessages) => [...prevMessages, msg]); // Agregar el mensaje enviado al estado
    }
  };

  return { messages, sendMessage };
};

export default useChat;
