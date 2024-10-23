import { useEffect, useState } from 'react';
import stompService from '../utils/stompService';

const useChat = () => {
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
                console.log('Mensaje recibido:', msg);
                console.log('Recipient:', recipient);
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
            // Asegúrate de que el endpoint sea el correcto
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

    return {
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
    };
};

export default useChat;
