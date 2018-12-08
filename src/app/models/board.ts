import { Dimensions } from './dimensions';
import { ShipLocation } from './ship-location';

export interface Board {
  name: string;
  dimensions: Dimensions;
  shipsLocations: ShipLocation[];
}
