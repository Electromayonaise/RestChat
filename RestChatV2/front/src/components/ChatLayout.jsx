import React from 'react';
import { Box } from '@mui/material';
import Chat from './Chat';
import ChatSidebar from './ChatSidebar';

const ChatLayout = ({
  username,
  receiver,
  setReceiver,
  startChat,
  chats,
  activeChat,
  onStartChat,
  onSelectChat,
}) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <ChatSidebar
        receiver={receiver}
        setReceiver={setReceiver}
        onStartChat={onStartChat}
        chats={chats}
        onSelectChat={onSelectChat}
        startChat={startChat}
      />
      
      {activeChat && (
        <Box sx={{ 
          flexGrow: 1, 
          marginLeft: startChat ? '20px' : '0', 
          transition: 'margin 0.3s' 
        }}>
          <Chat sender={username} receiver={activeChat} />
        </Box>
      )}
    </Box>
  );
};

export default ChatLayout;
 