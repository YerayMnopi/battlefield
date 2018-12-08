import { Injectable } from '@angular/core';
import { Board } from '../../../models/board';
import { ShipLocation } from '../../../models/ship-location';

@Injectable()
export class BoardVisualizationService {

  private matrix: boolean[][];
  private shipsMatrixes: {}[];

  constructor() { }

  getBoardMatrix(board: Board): boolean[][] {
    this.buildMatrix(board);
    this.shipsMatrixes = board.shipsLocations.map((shipLocation: ShipLocation) => this.buildShipMatrix(shipLocation));
    this.setTrueCellsWithAShipOnIt();

    return this.matrix;
  }

  buildMatrix(board: Board) {
    const widthArray = Array.from(Array(board.dimensions.width).keys()).map(() => false);
    const heigthArray = Array.from(Array(board.dimensions.height).keys());

    this.matrix = heigthArray.map((verticalIndex: number) => {
      return widthArray.slice();
    });
  }

  private buildShipMatrix(shipLocation: ShipLocation): {} {
    const widthArray = Array.from(Array(shipLocation.ship.dimensions.width).keys())
      .map((elementNumber, index) => shipLocation.location.x + elementNumber);
    const heigthArray = Array.from(Array(shipLocation.ship.dimensions.height).keys());

    const shipPositions = {};

    heigthArray.forEach((verticalIndex: number) => {
      shipPositions[shipLocation.location.y + verticalIndex] = widthArray.slice();
    });

    return shipPositions;
  }

  setTrueCellsWithAShipOnIt() {
    this.shipsMatrixes.forEach( (shipMatrix) => {
      Object.keys(shipMatrix).forEach((verticalPosition) => {
        shipMatrix[verticalPosition].forEach( (horizontalPosition) => {
          this.matrix[parseInt(verticalPosition, 10)][horizontalPosition] = true;
        });
      });
    });
  }
}
