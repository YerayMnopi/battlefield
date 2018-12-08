import { TestBed, inject } from '@angular/core/testing';

import { PlayerService } from './player.service';
import { BoardService } from './board.service';
import { BoardFactoryService } from './board-factory.service';
import { UtilsService } from './utils.service';
import { ShipFactoryService } from './ship-factory.service';
import { Board } from '../models/board';
import { Ship } from '../models/ship';
import { Point } from '../models/point';
import { PlayerFactoryService } from './player-factory.service';
import { Player } from '../models/player';

describe('PlayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlayerService,
        PlayerFactoryService,
        BoardService,
        BoardFactoryService,
        UtilsService,
        ShipFactoryService
      ]
    });
  });

  it('should be created', inject([PlayerService], (service: PlayerService) => {
    expect(service).toBeTruthy();
  }));

  it('should attack other player',
  inject([PlayerService, PlayerFactoryService, BoardService, BoardFactoryService, ShipFactoryService, UtilsService],
    (
      playerService: PlayerService,
      playerFactoryService: PlayerFactoryService,
      service: BoardService,
      factoryService: BoardFactoryService,
      shipFactoryService: ShipFactoryService,
      utilsService: UtilsService,
    ) => {

      const board: Board = factoryService.createLarge();
      service.setBoard(board);

      const location: Point = utilsService.getRamdonPointFromDimensions(service.getBoard().dimensions);
      const ship: Ship = shipFactoryService.createSmall();

      const shipLocation = {
        ship: ship,
        location: location
      };
      service.setShipLocation(ship, location);
      const player: Player = playerFactoryService.create('Pepito');

      playerService.bomb(player, location);

      expect(player.score).toBe(1);
    }));
});
