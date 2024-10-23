import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const MessageList = ({ messages, name }) => {
    return (
        <List>
            {messages
                .filter(msg => msg.sender === name || msg.chat?.to === name) // Filtra los mensajes
                .map((msg, index) => (
                    <ListItem
                        key={index}
                        style={{
                            justifyContent: msg.sender === name ? 'flex-end' : 'flex-start',
                            margin: '10px 0',
                        }}
                    >
                        <ListItemText
                            primary={
                                <>
                                    {/* Muestra el nombre del remitente si no es el usuario actual */}
                                    {msg.sender !== name && <strong>{msg.sender}:</strong>} {msg.content}
                                </>
                            }
                            style={{
                                backgroundColor: msg.sender === name ? '#cfe9ff' : '#f0f0f0', // Azul para mensajes enviados, gris para recibidos
                                borderRadius: '20px',
                                padding: '10px',
                                maxWidth: '40%', // Permite que el mensaje ocupe todo el ancho disponible
                                wordWrap: 'break-word', // Asegura que el texto largo se divida en múltiples líneas
                                textAlign: msg.sender === name ? 'right' : 'left',
                            }}
                        />
                    </ListItem>
                ))}
        </List>
    );
};

export default MessageList;
