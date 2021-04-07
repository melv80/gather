package com.gather.gather.com.gather.gather.com.gather.gather.controller;

import com.gather.gather.com.gather.gather.model.Message;
import com.google.gson.Gson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
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

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message)
            throws InterruptedException, IOException {
        logger.info(message.getPayload());

        for(WebSocketSession webSocketSession : sessions) {
            Message parsed = new Gson().fromJson(message.getPayload(), Message.class);
            webSocketSession.sendMessage(new TextMessage(parsed.getFrom()+": "+parsed.getText()));
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        //the messages will be broadcasted to all users.
        sessions.add(session);
    }



}
