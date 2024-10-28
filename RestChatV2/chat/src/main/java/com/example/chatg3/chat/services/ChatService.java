package com.example.chatg3.chat.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;

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
        Chat chat = getChat(message.getSender(), to);
        message.setChat(chat);
        messageRepository.save(message);

        simpMessagingTemplate.convertAndSend("/messageTo/" + to, message);
    }

    public Chat getChat(String sender, String to) {
        Chat chat = chatRepository.findBySenderAndTo(sender, to);
        if (chat == null) {
            chat = chatRepository.findBySenderAndTo(to, sender);
        }
        
        if (chat != null) {
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

    public List<Message> getChatMessages(String sender, String to) {
        Chat chat = getChat(sender, to);
        if (chat != null) {
            return messageRepository.findByChat(chat);
        }
        return new ArrayList<>(); 
    }
}
