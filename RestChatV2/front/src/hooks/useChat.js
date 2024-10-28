import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import axios from 'axios';

const useChat = (sender, receiver) => {
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/chat/history?sender=${sender}&to=${receiver}`);
      const messagesData = response.data;
      if (Array.isArray(messagesData)) {
        setMessages(messagesData);
      } else {
        console.error("Response is not an array:", messagesData);
        setMessages([]);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  useEffect(() => {
    fetchMessages();

    const socket = new SockJS('http://localhost:8081/ws-connect');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        stompClient.subscribe(`/messageTo/${receiver}`, (message) => {
          const msg = JSON.parse(message.body);
          if (msg.sender !== sender) {
            setMessages((prevMessages) => [...prevMessages, msg]);
          }
        });

        stompClient.subscribe(`/messageTo/${sender}`, (message) => {
          const msg = JSON.parse(message.body);
          if (msg.sender !== sender) {
            setMessages((prevMessages) => [...prevMessages, msg]);
          }
        });
      },
      onStompError: (frame) => {
        console.error('STOMP error:', frame.headers['message']);
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
      client.publish({
        destination: `/app/messageTo/${receiver}`,
        body: JSON.stringify(msg),
      });
      setMessages((prevMessages) => [...prevMessages, msg]);
    }
  };

  return { messages, sendMessage, fetchMessages };
};

export default useChat;

