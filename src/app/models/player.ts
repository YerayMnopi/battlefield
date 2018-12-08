import { Ship } from "./ship";
import { Point } from "./point";
import { Observable } from "rxjs/Observable";

export interface Player {
  name: String;
  ships: Ship[];
  score: number;
}
