import React from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const ChatSidebar = ({ 
  receiver, 
  setReceiver, 
  onStartChat, 
  chats, 
  onSelectChat,
  startChat 
}) => {
  return (
    <Box sx={{ width: startChat ? '30%' : '100%', transition: 'width 0.3s' }}>
      <Typography variant="h5" gutterBottom>Chats</Typography>
      <TextField
        label="Iniciar Chat"
        variant="outlined"
        fullWidth
        margin="normal"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
        sx={{ '& .MuiInputBase-input': { fontSize: '1.2rem' } }}
      />
      <Button 
        variant="contained" 
        fullWidth 
        onClick={onStartChat} 
        sx={{ marginTop: 1 }}
      >
        Iniciar Chat
      </Button>
      
      <List>
        {chats.map((chat, index) => (
          <ListItem 
            button 
            key={index} 
            onClick={() => onSelectChat(chat)}
          >
            <ListItemText primary={chat} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ChatSidebar;