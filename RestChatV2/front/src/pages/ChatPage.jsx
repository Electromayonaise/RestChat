import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import Chat from '../components/Chat';

const ChatPage = () => {
    return (
        <Container maxWidth="sm" style={{ marginTop: '50px' }}>
            <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Chat Pro
                </Typography>
                <Chat />
            </Paper>
        </Container>
    );
};

export default ChatPage;
