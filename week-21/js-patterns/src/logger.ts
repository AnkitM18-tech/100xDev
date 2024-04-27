/*
Initial Approach of variable

import { games } from "./store";

export function startLogger() {
  setInterval(() => {
    console.log(games);
  }, 4000);
}
*/

// Bad approach for class - separate instance in every file that needs it

/*
import { gameManager } from "./store";

// const gameManager = new GameManager();

export function startLogger() {
  setInterval(() => {
    gameManager.logState();
  }, 4000);
}
*/

import { GameManager } from "./store";

export function startLogger() {
  setInterval(() => {
    GameManager.getInstance().logState();
  }, 4000);
}
