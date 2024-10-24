import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import UserNameForm from '../components/UserNameForm';
import ChatLayout from '../components/ChatLayout';
import ToggleThemeSwitch from '../components/ToggleThemeSwitch';

const ChatPage = () => {
  const [username, setUsername] = useState('');
  const [isUsernameConfirmed, setIsUsernameConfirmed] = useState(false);
  const [receiver, setReceiver] = useState('');
  const [startChat, setStartChat] = useState(false);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  const handleStartChat = () => {
    if (receiver.trim()) {
      setChats(prevChats => {
        if (!prevChats.includes(receiver)) {
          return [...prevChats, receiver];
        }
        return prevChats;
      });
      setActiveChat(receiver);
      setStartChat(true);
    }
  };

  const handleSelectChat = (chatUser) => {
    setActiveChat(chatUser);
  };

  const handleSetUsername = () => {
    if (username.trim()) {
      setIsUsernameConfirmed(true);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4, position: 'relative' }}>
      <Box sx={{ position: 'fixed', top: 20, right: 20 }}>
        <ToggleThemeSwitch />
      </Box>

      {!isUsernameConfirmed ? (
        <UserNameForm
          username={username}
          setUsername={setUsername}
          onConfirm={handleSetUsername}
        />
      ) : (
        <ChatLayout
          username={username}
          receiver={receiver}
          setReceiver={setReceiver}
          startChat={startChat}
          chats={chats}
          activeChat={activeChat}
          onStartChat={handleStartChat}
          onSelectChat={handleSelectChat}
        />
      )}
    </Container>
  );
};

export default ChatPage;