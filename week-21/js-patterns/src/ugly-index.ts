// Bad approach for class - separate instance in every file that needs it
import { GameManager } from "./store";
import { startLogger } from "./logger";

const gameManager = new GameManager();

startLogger();

setInterval(() => {
  gameManager.addGame({
    id: Math.random().toString(),
    whitePlayer: "harkirat",
    blackPlayer: "jaskirat",
    moves: [],
  });
}, 5000);

/*
Initial approach of variable export

import { games } from "./store";
startLogger();

setInterval(() => {
  games.push({
    whitePlayer: "harkirat",
    blackPlayer: "jaskirat",
    moves: [],
  });
}, 5000);

*/
// websocket server
// in order to update the moves array we need to dig deep into the game object to access the moves array and push our moves. It would be convenient to make a class and expose functionalities. The user should not be worried about the internal logic.
// Slightly Better approach - Export a single instance of gameManager from GameManager.ts and use it everywhere
