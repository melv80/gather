package com.gather.gather.com.gather.gather.model;

import lombok.Data;

@Data
public class Player {
    private long id;

    // position
    private int x, y = 0;

    private String name;

    public Player(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public void move(int dx, int dy) {
        x += dx;
        y += dy;
    }


}