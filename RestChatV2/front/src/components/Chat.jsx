import React from 'react';
import { TextField, Button } from '@mui/material';
import MessageList from './MessageList';
import useChat from '../hooks/useChat';

const Chat = () => {
    const {
        name,
        setName,
        recipient,
        setRecipient,
        message,
        setMessage,
        messages,
        sendMessage,
        isNameSet,
        handleNameSubmit
    } = useChat();

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {!isNameSet ? (
                <div>
                    <TextField
                        label="Tu Nombre"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNameSubmit}
                        fullWidth
                    >
                        Definir Nombre
                    </Button>
                </div>
            ) : (
                <div>
                    <TextField
                        label="Destinatario"
                        variant="outlined"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Mensaje"
                        variant="outlined"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={sendMessage}
                        fullWidth
                    >
                        Enviar Mensaje
                    </Button>
                    <div style={{ overflowY: 'auto', maxHeight: '400px', marginTop: '20px' }}>
                        <MessageList messages={messages} name={name} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;

