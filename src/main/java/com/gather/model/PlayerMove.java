package com.gather.model;

import lombok.Data;

@Data
public class PlayerMove {
    int playerID;
    private int dx, dy;
}
