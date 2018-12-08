import { Injectable } from '@angular/core';
import { Dimensions } from '../models/dimensions';
import { Point } from '../models/point';

@Injectable()
export class UtilsService {

  constructor() { }

  generateRamdonNumber([min, max]: [number, number]): number {
    return Math.floor(
      Math.random() * (max - min + 1) + min
    );
  }

  checkNumberIsWithinRange(numberToCheck: number, rangeToCheck: [number, number]): boolean {
    return rangeToCheck[0] <= numberToCheck && numberToCheck <= rangeToCheck[1];
  }

  generateRamdonDimesions(range: [number, number]): Dimensions {
    return {
      width: this.generateRamdonNumber(range),
      height: this.generateRamdonNumber(range)
    };
  }

  generateUniqueId(): number {
    return Date.now() + Math.random();
  }

  generateRamdonPoint(xRange: [number, number], yRange: [number, number]): Point {
    return {
      x: this.generateRamdonNumber(xRange),
      y: this.generateRamdonNumber(yRange)
    };
  }

  getRamdonPointFromDimensions(dimensions: Dimensions) {
    return this.generateRamdonPoint(
      [1, dimensions.width],
      [1, dimensions.height]
    );
  }
}
