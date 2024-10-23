import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export const connectWebSocket = (user, onMessageReceived) => {
    const socket = new SockJS('http://localhost:8081/ws-connect'); // Cambia esto si es necesario
    const stompClient = new Client({
        webSocketFactory: () => socket,
        onConnect: () => {
            stompClient.subscribe(`/messageTo/${user}`, onMessageReceived);
        },
        onStompError: (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
        },
    });

    stompClient.activate();
    return stompClient;
};
