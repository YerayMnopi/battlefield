import { Board } from "./board";

export interface BoardServiceInterface {
  // board: Board;
  // ships: Ship[];

  getBoard(): Board;
  setBoard(boardToSet: Board): void;
}