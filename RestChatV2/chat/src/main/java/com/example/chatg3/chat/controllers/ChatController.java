package com.example.chatg3.chat.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import java.util.List;
import com.example.chatg3.chat.model.Chat;
import com.example.chatg3.chat.model.Message;
import com.example.chatg3.chat.services.ChatService;
import com.example.chatg3.chat.repositories.ChatRepository;

@RestController
@RequestMapping("/chat")
public class ChatController {
    
    @Autowired
    private ChatService chatService;

    @Autowired
    private ChatRepository chatRepository;

    @MessageMapping("/send")
    @SendTo("/messageTo")
    public Message sendMessage(@RequestBody Message message) {
        System.out.println("Received message: " + message);
        System.out.println("In chat:" + message.getChat());
        if (message.getChat() == null || message.getChat().getTo() == null) {
            throw new IllegalArgumentException("Chat information is incomplete.");
        }
    
        String recipient = message.getChat().getTo();
    
        // Log the details
        System.out.println("Enviando mensaje:");
        System.out.println("Remitente: " + message.getSender());
        System.out.println("Destinatario: " + recipient);
        System.out.println("Contenido del mensaje: " + message.getContent());
    
        // Send the message using the service
        chatService.sendMessage(message, recipient);
        return message;
    }
    

    @GetMapping
    public ResponseEntity<?> getChat(@ModelAttribute Chat chat) {
        return ResponseEntity.ok(chatService.getChat(chat.getSender(), chat.getTo()));
    }

    @GetMapping("/messages/{chatId}")
    public ResponseEntity<List<Message>> getMessages(@PathVariable Integer chatId) {
        System.out.println("Obteniendo mensajes del chat: " + chatId);
        List<Message> messages = chatService.getMessages(chatId);
        System.out.println("Mensajes encontrados: " + messages);
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/id")
    public ResponseEntity<Integer> getChatId(@RequestParam String sender, @RequestParam String recipient) {
        System.out.println("Obteniendo ID del chat entre " + sender + " y " + recipient);
        Chat chat = chatService.getChat(sender, recipient);
        System.out.println("Chat encontrado: " + chat);
        if (chat != null) {
            return ResponseEntity.ok(chat.getId());
        } else {
            // Crear un nuevo chat si no existe y devolver su ID
            Chat newChat = Chat.builder().sender(sender).to(recipient).build();
            chatRepository.save(newChat);
            return ResponseEntity.ok(newChat.getId());
        }
    }
}
