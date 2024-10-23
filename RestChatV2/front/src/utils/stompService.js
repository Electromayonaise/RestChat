import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class StompService {
    constructor(url) {
        this.client = null;
        this.callbacks = {};
        this.subscriptions = {}; // Store active subscriptions
        this.isConnect = false;

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
            const subscription = this.client.subscribe(destination, (msg) => {
                const message = JSON.parse(msg.body);
                this.callbacks[destination](message);
            });
            this.subscriptions[destination] = subscription; // Store the subscription
        }
    }

    unsubscribe(destination) {
        const subscription = this.subscriptions[destination];
        if (subscription) {
            subscription.unsubscribe();
            delete this.subscriptions[destination]; // Remove from the subscriptions list
            console.log(`Desuscrito de ${destination}`);
        } else {
            console.warn(`No hay suscripción activa para ${destination}`);
        }
    }

    publish(destination, message) {
        if (this.isConnect) {
            this.client.publish({ destination: destination, body: JSON.stringify(message) });
            console.log('Mensaje publicado al back:', message);
            console.log('Publicado en:', destination);
            console.log('Estado de conexión:', this.isConnect);
        } else {
            console.error('No conectado. No se puede publicar el mensaje.');
        }
    }

    disconnect() {
        if (this.client) {
            this.client.deactivate();
            console.log('Desconectado del WebSocket');
        }
    }

    processSubscriptions() {
        for (const destination in this.callbacks) {
            this.subscribe(destination, this.callbacks[destination]);
        }
    }
}

const stompService = new StompService('http://localhost:8081/ws-connect');
export default stompService;
