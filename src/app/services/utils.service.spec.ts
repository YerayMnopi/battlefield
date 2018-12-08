import { TestBed, inject } from '@angular/core/testing';

import { UtilsService } from './utils.service';
import { Dimensions } from '../models/dimensions';
import { Point } from '../models/point';

describe('UtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilsService]
    });
  });

  it('should be created', inject([UtilsService], (service: UtilsService) => {
    expect(service).toBeTruthy();
  }));

  it('should create a random number within a range', inject([UtilsService], (service: UtilsService) => {
    const range: [number, number] = [10, 90];
    const ramdonNumber = service.generateRamdonNumber(range);
    expect(ramdonNumber).toBeGreaterThanOrEqual(range[0]);
    expect(ramdonNumber).toBeLessThanOrEqual(range[1]);
  }));

  it('should check a point is within a range', inject([UtilsService], (service: UtilsService) => {
    const range: [number, number] = [10, 90];
    let numberToCheck = 10;
    let numberIsInRange = service.checkNumberIsWithinRange(numberToCheck, range);
    expect(numberIsInRange).toBe(true);

    numberToCheck = 1;
    numberIsInRange = service.checkNumberIsWithinRange(numberToCheck, range);
    expect(numberIsInRange).toBe(false);
  }));

  it('should create an unique id', inject([UtilsService], (service: UtilsService) => {
    const id = service.generateUniqueId();
    const anotherId = service.generateUniqueId();

    expect(id).not.toBe(anotherId);
  }));

  it('should create a ramdon point', inject([UtilsService], (service: UtilsService) => {
    const point = service.generateRamdonPoint([0, 100], [0, 100]);
    expect(point.x).toBeGreaterThanOrEqual(0);
    expect(point.x).toBeLessThanOrEqual(100);
    expect(point.y).toBeGreaterThanOrEqual(0);
    expect(point.y).toBeLessThanOrEqual(100);
  }));

  it('should create a ramdon point from dimensions', inject([UtilsService], (service: UtilsService) => {
    const dimensions: Dimensions = service.generateRamdonDimesions([1, 100]);
    const point: Point = service.getRamdonPointFromDimensions(dimensions);
    expect(point.x).toBeGreaterThanOrEqual(0);
    expect(point.x).toBeLessThanOrEqual(100);
    expect(point.y).toBeGreaterThanOrEqual(0);
    expect(point.y).toBeLessThanOrEqual(100);
  }));

});
