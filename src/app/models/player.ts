import { Ship } from "./ship";

export interface Player {
  name: String;
  ships: Ship[];
  score: number;
}
