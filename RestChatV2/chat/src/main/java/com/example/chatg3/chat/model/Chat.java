package com.example.chatg3.chat.model;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference; // Importar para manejar la referencia
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Chat
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "chat")
public class Chat implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String sender;

    private String to;

    @OneToMany(mappedBy = "chat", fetch = FetchType.EAGER)
    @JsonManagedReference // Indica que esta es la referencia que se serializa
    private List<Message> messages;

    @Override
    public String toString() {
        return "Chat{" +
                "id=" + id +
                ", sender='" + sender + '\'' +
                ", to='" + to + '\'' +
                ", messagesCount=" + (messages != null ? messages.size() : 0) +
                '}';
    }
}
