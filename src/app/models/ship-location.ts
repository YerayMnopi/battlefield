import { Point } from "./point";
import { Ship } from "./ship";

export interface ShipLocation {
  location: Point;
  ship: Ship;
}