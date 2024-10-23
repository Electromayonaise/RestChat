import { useEffect, useState } from 'react';
import stompService from '../utils/stompService';
import axios from 'axios';

const useChat = () => {
    const [name, setName] = useState('');
    const [recipient, setRecipient] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isNameSet, setIsNameSet] = useState(false);
    const [chatId, setChatId] = useState(null);

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8081',
    });
    
    useEffect(() => {
        if (recipient) {
            const fetchChatId = async () => {
                try {
                    const response = await axiosInstance.get(`/chat/id?sender=${name}&recipient=${recipient}`);
                    setChatId(response.data);
                    fetchMessages(response.data);
                    console.log('Chat ID:', response.data);
                } catch (error) {
                    console.error('Error fetching chat ID:', error);
                }
            };
            fetchChatId();
        }
    }, [recipient, name]);

    const fetchMessages = async (chatId) => {
        try {
            const response = await axiosInstance.get(`/chat/messages/${chatId}`);
            console.log('Mensajes obtenidos:', response.data);
            setMessages(response.data);
        } catch (error) {
            console.error('Error al obtener mensajes:', error);
        }
    };

    useEffect(() => {
        if (recipient) {
            stompService.subscribe(`/messageTo`, (msg) => {
                const message = JSON.parse(msg.body);
                console.log('Mensaje recibido:', message);
                setMessages((prevMessages) => [...prevMessages, message]); // Asegúrate de agregar el mensaje correctamente
            });
        }
        return () => {
            if (recipient) {
                stompService.unsubscribe(`/messageTo`);
            }
        };
    }, [recipient]);

    const sendMessage = () => {
        if (name && recipient && message) {
            const msg = {
                sender: name,
                type: 'TEXT',
                content: message,
                isRead: false,
                chat: {
                    id: chatId,
                    sender: name,
                    to: recipient,
                },
            };
            stompService.publish('/app/send',msg); // Asegúrate de serializar el mensaje
            setMessage('');
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
        handleNameSubmit,
        chatId,
    };
};

export default useChat;
