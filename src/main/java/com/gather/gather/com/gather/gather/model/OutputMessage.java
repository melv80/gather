package com.gather.gather.com.gather.gather.model;

import lombok.Data;

@Data
public class OutputMessage {

    private final String from;
    private final String text;
    private final String time;

    public OutputMessage(String from, String text, String time) {
        this.from = from;
        this.text = text;
        this.time = time;
    }
}
