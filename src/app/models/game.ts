import { Board } from "./board";
import { Player } from "./player";

export interface Game {
  board: Board;
  players: Player[];

  start(): String;
  finish(): String;

}
