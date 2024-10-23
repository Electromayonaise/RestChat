import React, { useEffect, useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import stompService from './utils/stompService';

const Chat = () => {
    const [name, setName] = useState('');
    const [recipient, setRecipient] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isNameSet, setIsNameSet] = useState(false);

    useEffect(() => {
        const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        setMessages(storedMessages);

        const handleStorageChange = (event) => {
            if (event.key === 'chatMessages') {
                const newMessages = JSON.parse(event.newValue);
                setMessages(newMessages);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        if (recipient) {
            stompService.subscribe(`/messageTo/${recipient}`, (msg) => {
                // Guardamos el mensaje en localStorage
                setMessages((prevMessages) => [...prevMessages, msg]);
                const currentMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
                localStorage.setItem('chatMessages', JSON.stringify([...currentMessages, msg]));
            });
        }
    }, [recipient]);

    const sendMessage = () => {
        if (name && recipient && message) {
            const msg = {
                sender: name,
                type: 'TEXT',
                content: message,
                isRead: false,
                chat: {
                    sender: name,
                    to: recipient,
                },
            };
            stompService.publish(`/app/chat`, msg); // Publicar el mensaje
            setMessages((prevMessages) => [...prevMessages, msg]); // Añadir el mensaje a la lista local
            setMessage('');
            // Actualiza localStorage
            const currentMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
            localStorage.setItem('chatMessages', JSON.stringify([...currentMessages, msg]));
        } else {
            console.warn('Completa todos los campos antes de enviar el mensaje');
        }
    };

    const handleNameSubmit = () => {
        if (name) {
            setIsNameSet(true);
        } else {
            console.warn('Por favor, ingresa un nombre.');
        }
    };

    return (
        <div>
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
                    <List>
                        {messages
                            .filter(msg => msg.sender === name || msg.chat?.to === name) // Filtra los mensajes
                            .map((msg, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={`${msg.sender}: ${msg.content}`} />
                                </ListItem>
                            ))}
                    </List>
                </div>
            )}
        </div>
    );
};

export default Chat;
