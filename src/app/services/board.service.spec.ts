import { TestBed, inject } from '@angular/core/testing';

import { BoardService } from './board.service';
import { BoardFactoryService } from './board-factory.service';
import { UtilsService } from './utils.service';
import { ShipFactoryService } from './ship-factory.service';

import { Board } from '../models/board';
import { Ship } from '../models/ship';
import { Point } from '../models/point';

describe('BoardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BoardService,
        BoardFactoryService,
        UtilsService,
        ShipFactoryService
      ]
    });
  });

  it('should be created', inject([BoardService], (service: BoardService) => {
    expect(service).toBeTruthy();
  }));

  it('should be able to set and get a board object',
    inject([BoardService, BoardFactoryService], (service: BoardService, factoryService: BoardFactoryService
  ) => {
    const board: Board = factoryService.createSmall();
    service.setBoard(board);
    expect(service.getBoard()).toBeTruthy();
  }));

  it('should be able to get the range from a ship location',
    inject([BoardService, BoardFactoryService, UtilsService, ShipFactoryService],
      (service: BoardService, factoryService: BoardFactoryService, utilsService: UtilsService, shipFactoryService: ShipFactoryService
  ) => {
    const board: Board = factoryService.createSmall();
    service.setBoard(board);

    const location: Point = utilsService.getRamdonPointFromDimensions(service.getBoard().dimensions);

    const shipLocation = {
      ship: shipFactoryService.createSmall(),
      location: location
    };
    expect(service['getShipLocationWidthRange'](shipLocation).length).toBe(2);
    expect(service['getShipLocationHeightRange'](shipLocation).length).toBe(2);

  }));

  it('should be able to set a ship in a board',
    inject([BoardService, BoardFactoryService, ShipFactoryService],
    (
      service: BoardService,
      factoryService: BoardFactoryService,
      shipFactoryService: ShipFactoryService
    ) => {
      const board: Board = factoryService.createLarge();
      service.setBoard(board);

      const ship: Ship = shipFactoryService.createSmall();
      service.setShipLocation(ship);

      expect(service.getBoard().shipsLocations.length).toBe(1);

      const mediumShip: Ship = shipFactoryService.createMedium();
      service.setShipLocation(mediumShip);

      expect(service.getBoard().shipsLocations.length).toBe(2);

      const largeShip: Ship = shipFactoryService.createLarge();

      try {
        service.setShipLocation(largeShip);
        expect(service.getBoard().shipsLocations.length).toBe(3);
      } catch (error) {
        expect(service.getBoard().shipsLocations.length).toBe(2);
      }

      console.log(service.getBoard());

  }));

  it('should be able to check a point is free',
    inject([BoardService, BoardFactoryService, UtilsService],
      (service: BoardService, factoryService: BoardFactoryService, utilsService: UtilsService
  ) => {
    const board: Board = factoryService.createSmall();
    service.setBoard(board);

    const location: Point = utilsService.getRamdonPointFromDimensions(service.getBoard().dimensions);
    expect(service['checkPointIsFree'](location)).toEqual(true);
  }));

  it('should be able to check a location is free',
    inject([BoardService, BoardFactoryService, UtilsService, ShipFactoryService],
      (service: BoardService, factoryService: BoardFactoryService, utilsService: UtilsService, shipFactoryService: ShipFactoryService
  ) => {
    const board: Board = factoryService.createSmall();
    service.setBoard(board);

    const location: Point = utilsService.getRamdonPointFromDimensions(service.getBoard().dimensions);
    const ship: Ship = shipFactoryService.createSmall();

    const shipLocation = {
      ship: ship,
      location: location
    };

    expect(service['checkShipLocationIsFree'](shipLocation)).toEqual(true);

    service.setShipLocation(ship, location);

    expect(service['checkShipLocationIsFree'](shipLocation)).toEqual(false);

  }));

  it('should have a board changes subject', inject([BoardService], (service: BoardService) => {
    expect(service['boardChanges']).toBeTruthy();
  }));
});
