import { Injectable } from '@angular/core';
import { BoardFactory } from '../models/board-factory';
import { Board } from '../models/board';
import { UtilsService } from './utils.service';
import { Dimensions } from '../models/dimensions';

@Injectable()
export class BoardFactoryService  implements BoardFactory {
  smallRange: [number, number] = [5, 10];
  mediumRange: [number, number] = [10, 15];
  largeRange: [number, number] = [15, 20];

  constructor(
    private utilsService: UtilsService
  ) { }

  createSmall(): Board {
    return this.create(
      'Small',
      this.utilsService.generateRamdonDimesions(this.smallRange)
    );
  }

  createMedium(): Board {
    return this.create(
      'Medium',
      this.utilsService.generateRamdonDimesions(this.mediumRange)
    );
  }

  createLarge(): Board {
    return this.create(
      'Large',
      this.utilsService.generateRamdonDimesions(this.largeRange)
    );
  }

  private create(name: string, dimensions: Dimensions): Board {
    return {
      name: name,
      dimensions: dimensions,
      shipsLocations: []
    };
  }

}
