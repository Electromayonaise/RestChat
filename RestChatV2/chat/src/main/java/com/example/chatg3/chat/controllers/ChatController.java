package com.example.chatg3.chat.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.chatg3.chat.model.Chat;
import com.example.chatg3.chat.model.Message;
import com.example.chatg3.chat.services.ChatService;



@RestController
@RequestMapping("/chat")
public class ChatController {
    
    @Autowired
    private ChatService chatService;

    @PostMapping
    public ResponseEntity<?> sendMessage(@RequestBody Message message, 
        @ModelAttribute Chat chat) {
        System.out.println(chat);
        System.out.println(message);
        chatService.sendMessage(message, chat.getTo());
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<?> getChat(@ModelAttribute Chat chat) {
        return ResponseEntity.ok(
            chatService.getChat(chat.getSender(), chat.getTo())
        );
    }
}
