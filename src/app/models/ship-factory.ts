import { Ship } from "./ship";

export interface ShipFactory {
  smallRange: [number, number];
  createSmall(): Ship;
  createMedium(): Ship;
  createLarge(): Ship;
}
