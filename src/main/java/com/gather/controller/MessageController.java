package com.gather.controller;

import com.gather.components.GameManager;
import com.gather.model.Message;
import com.google.gson.Gson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class MessageController extends TextWebSocketHandler {
    private Logger logger = LoggerFactory.getLogger("MessageLogger");

    List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();

    private final GameManager gameManager;

    public MessageController(@Autowired GameManager gameManager) {
        this.gameManager = gameManager;
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message)
            throws InterruptedException, IOException {
        logger.info(message.getPayload());

        for(WebSocketSession webSocketSession : sessions) {
            Message parsed = new Gson().fromJson(message.getPayload(), Message.class);

            if (parsed.getType().equalsIgnoreCase("command")) {
              gameManager.playerJoined(parsed.getFrom());
            }
            else if (parsed.getType().equalsIgnoreCase("chat")) {
                webSocketSession.sendMessage(new TextMessage(parsed.getFrom() + ": " + parsed.getText()));
            }
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        //the messages will be broadcasted to all users.
        sessions.add(session);
    }



}
