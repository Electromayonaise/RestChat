package com.example.chatg3.chat.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.chatg3.chat.model.Chat;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer> {
    public Chat findBySenderAndTo(String sender, String to);
}
