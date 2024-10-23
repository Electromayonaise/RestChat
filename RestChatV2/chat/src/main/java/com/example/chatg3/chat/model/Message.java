package com.example.chatg3.chat.model;

import com.fasterxml.jackson.annotation.JsonBackReference; // Importar para manejar la referencia
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "message")
public class Message {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String sender;
    private String type;
    private String content;
    private boolean isRead;

    @ManyToOne
    @JoinColumn(name = "chat_id")
    @JsonBackReference // Indica que esta es la referencia que no se serializa
    private Chat chat;

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", sender='" + sender + '\'' +
                ", type='" + type + '\'' +
                ", content='" + content + '\'' +
                ", isRead=" + isRead +
                '}';
    }
}
