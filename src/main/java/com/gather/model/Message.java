package com.gather.model;

import lombok.Data;

@Data
public class Message {
    private String from;
    private String text;
    private String type;
}
