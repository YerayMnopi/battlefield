import { Dimensions } from './dimensions';
import { ShipLocation } from './ship-location';

export interface Board {
  name: String;
  dimensions: Dimensions;
  shipsLocations: ShipLocation[];
}
