import { Injectable } from '@angular/core';
import { ShipFactory } from '../models/ship-factory';
import { Ship } from '../models/ship';
import { UtilsService } from './utils.service';

@Injectable()
export class ShipFactoryService implements ShipFactory {
  smallRange: [number, number] = [1, 3];
  mediumRange: [number, number] = [4, 6];
  largeRange: [number, number] = [7, 9];

  constructor(
    private utilsService: UtilsService
  ) { }

  createSmall(): Ship {
    return this.create(this.smallRange);
  }

  createMedium(): Ship {
    return this.create(this.mediumRange);
  }

  createLarge(): Ship {
    return this.create(this.largeRange);
  }

  private create(range: [number, number]): Ship {
    return {
      id: this.utilsService.generateUniqueId(),
      dimensions: this.utilsService.generateRamdonDimesions(range)
    };
  }

}
