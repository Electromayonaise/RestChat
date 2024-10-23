package com.example.chatg3.chat.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.example.chatg3.chat.model.Chat;
import com.example.chatg3.chat.model.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
    List<Message> findByChat(Chat chat);
}
