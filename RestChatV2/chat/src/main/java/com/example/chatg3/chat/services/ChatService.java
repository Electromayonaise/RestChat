package com.example.chatg3.chat.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.example.chatg3.chat.model.Chat;
import com.example.chatg3.chat.model.Message;
import com.example.chatg3.chat.repositories.ChatRepository;
import com.example.chatg3.chat.repositories.MessageRepository;

@Service
public class ChatService {
    
    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    public void sendMessage(Message message, String to) {
        Chat chat = chatRepository.findBySenderAndTo(
            message.getSender(), 
            to
        );
    
        if(chat == null) {
            chat = Chat.builder()
                .sender(message.getSender())
                .to(to)
                .build();
            chatRepository.save(chat);
            System.out.println("Nuevo chat creado: " + chat);
        }
    
        message.setChat(chat);
        messageRepository.save(message);
        
        // Imprime el mensaje que se guarda
        System.out.println("Mensaje guardado: " + message.getContent());
        
        // Notifica al usuario
        System.out.println("Enviando mensaje a: " + to);
        simpMessagingTemplate.convertAndSend(
            "/messageTo/" + to, 
            message
        );
    }
    

    public Chat getChat(String sender, String to) {
        Chat chat = chatRepository.findBySenderAndTo(sender, to);
        if(chat != null) {
            return chat;
        } else {
          chat = Chat.builder()
                .sender(sender)
                .to(to)
                .build();

            chatRepository.save(chat);
            return chat;
        }
    }
}
