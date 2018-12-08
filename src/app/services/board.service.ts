import { Injectable } from '@angular/core';
import { BoardServiceInterface } from '../models/board-service.interface';
import { Board } from '../models/board';
import { Ship } from '../models/ship';
import { Point } from '../models/point';
import { ShipLocation } from '../models/ship-location';

import { UtilsService } from './utils.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import { BoardFactoryService } from './board-factory.service';
import { ShipFactoryService } from './ship-factory.service';

@Injectable()
export class BoardService implements BoardServiceInterface {

  private board: Board;

  private boardChanges = new Subject<Board>();

  constructor(
    private utilsService: UtilsService,
    private boardFactoryService: BoardFactoryService,
    private shipFactoryService: ShipFactoryService
  ) {
    this.setBoard(this.boardFactoryService.createSmall());
    this.setShipLocation(this.shipFactoryService.createSmall());
  }

  getBoard(): Board {
    return this.board;
  }

  setBoard(boardToSet: Board) {
    this.board = boardToSet;
    this.boardChanges.next(JSON.parse(JSON.stringify(this.board)));
  }

  getBoardChanges(): Observable<Board> {
    return this.boardChanges.startWith(this.board);
  }

  setShipLocation(shipToSet: Ship, location?: Point) {
    if (!location) {
      location = this.utilsService.getRamdonPointFromDimensions(this.board.dimensions);
    }

    const shipLocation = {
      ship: shipToSet,
      location: location
    };

    const tries = 5;

    for (let index = 0; index <= tries; index++) {
      if (this.checkShipLocationIsFree(shipLocation)) {
        this.board.shipsLocations.push(shipLocation);
        this.boardChanges.next(this.board);
        return;
      } else {
        location = this.utilsService.getRamdonPointFromDimensions(this.board.dimensions);
      }
    }
    throw(new Error('Max tries for setting ship location reached'));
  }

  checkPointIsFree(locationToCheck: Point): boolean {
    const shipId = this.getShipIdFromLocation(locationToCheck);
    return !shipId;
  }

  getShipIdFromLocation(locationToCheck: Point): number {
    const shipInLocation = this.board.shipsLocations
      .find(
        (shipLocation: ShipLocation) =>
          (
            this.utilsService.checkNumberIsWithinRange(
              locationToCheck.x,
              this.getShipLocationWidthRange(shipLocation)
            )
          )
          ||
          (
            this.utilsService.checkNumberIsWithinRange(
              locationToCheck.y,
              this.getShipLocationHeightRange(shipLocation)
            )
          )
      );
    return shipInLocation && shipInLocation.ship.id;
  }

  private checkShipLocationIsFree(shipLocation: ShipLocation): boolean {
    return this.checkShipLocationWidthIsFree(shipLocation) && this.checkShipLocationHeightIsFree(shipLocation); 
  }

  private checkShipLocationWidthIsFree(shipLocation: ShipLocation): boolean {
    const widthRange = this.getShipLocationWidthRange(shipLocation);

    for (let index = widthRange[0]; index <= widthRange[1]; index++ ) {
      const pointToCheck: Point = {
        x: index,
        y: shipLocation.location.y
      };
      if (!this.checkPointIsFree(pointToCheck)) {
        return false;
      }
    }

    return true;
  }

  private checkShipLocationHeightIsFree(shipLocation: ShipLocation): boolean {
    const heightRange = this.getShipLocationWidthRange(shipLocation);

    for (let index = heightRange[0]; index <= heightRange[1]; index++ ) {
      const pointToCheck: Point = {
        x: shipLocation.location.x,
        y: index
      };
      if (!this.checkPointIsFree(pointToCheck)) {
        return false;
      }
    }

    return true;
  }

  private getShipLocationWidthRange(shipLocation: ShipLocation): [number, number] {
    return [shipLocation.location.x, shipLocation.location.x + shipLocation.ship.dimensions.width];
  }

  private getShipLocationHeightRange(shipLocation: ShipLocation): [number, number] {
    return [shipLocation.location.y, shipLocation.location.y + shipLocation.ship.dimensions.height];
  }
}
