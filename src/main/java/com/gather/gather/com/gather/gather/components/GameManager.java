package com.gather.gather.com.gather.gather.components;

import com.gather.gather.com.gather.gather.model.Player;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class GameManager {


    private Logger logger = LoggerFactory.getLogger("GameManager");
    private int nextPlayerID;

    private List<Player> players = new ArrayList<>();


    public void playerJoined(String name) {
        Player player = new Player(nextPlayerID++, name);
        players.add(player);
        logger.info("Player joined "+player);
    }

    public void playerDisconnected(int playerID) {

        players
                .stream()
                .filter(lp -> lp.getId() == playerID)
                .findFirst()
                .ifPresent(player -> {
                    logger.info("Player left: "+player);
                    players.remove(player);
                });

    }


}
