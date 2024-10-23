// src/utils/stompService.js
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class StompService {
    constructor(url) {
        this.client = null;
        this.callbacks = {};
        this.isConnect = false;
        this.messages = JSON.parse(localStorage.getItem('chatMessages')) || []; // Cargar mensajes almacenados

        if (url) {
            this.connect(url);
        }
    }

    connect(url) {
        this.client = new Client({
            webSocketFactory: () => {
                return new SockJS(url);
            },
            debug: (str) => { console.log(str); },
            onConnect: () => {
                console.log('Conectado a WebSocket');
                this.isConnect = true;
                this.processSubscriptions();
            },
            onStompError: (frame) => {
                console.error('Error en STOMP: ' + frame.headers['message']);
            },
        });

        this.client.activate();
    }

    subscribe(destination, callback) {
        this.callbacks[destination] = callback;

        if (this.isConnect) {
            this.client.subscribe(destination, (msg) => {
                const message = JSON.parse(msg.body);
                this.callbacks[destination](message);
                this.messages.push(message); // Almacenar mensaje
                // Actualizar localStorage
                localStorage.setItem('chatMessages', JSON.stringify(this.messages));
            });
        }
    }

    publish(destination, message) {
        if (this.isConnect) {
            this.client.publish({ destination: destination, body: JSON.stringify(message) });
            console.log('Mensaje publicado definitivamente al back:', message);
        } else {
            console.error('No conectado. No se puede publicar el mensaje.');
        }
    }

    processSubscriptions() {
        // Aquí puedes agregar la lógica para procesar suscripciones si es necesario
        console.log('Suscripciones procesadas');
    }

    disconnect() {
        if (this.client) {
            this.client.deactivate();
            console.log('Desconectado del WebSocket');
        }
    }
}

const stompService = new StompService('http://localhost:8081/ws-connect'); // Asegúrate de que la URL sea correcta
export default stompService;
