package com.example.chatg3.chat.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

import com.example.chatg3.chat.model.Message;
import com.example.chatg3.chat.services.ChatService;


@Controller
public class WebSocketController {

    @Autowired
    private ChatService chatService;

    @MessageMapping("/messageTo/{user}")
    public void handleMessage(@DestinationVariable("user") String user, @Payload Message message) {
        System.out.println("Message to: " + user);
        chatService.sendMessage(message, user);
    }
}