import { TestBed, inject } from '@angular/core/testing';

import { BoardVisualizationService } from './board-visualization.service';

describe('BoardVisualizationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoardVisualizationService]
    });
  });

  it('should be created', inject([BoardVisualizationService], (service: BoardVisualizationService) => {
    expect(service).toBeTruthy();
  }));

  it('should create the board matrix', inject([BoardVisualizationService], (service: BoardVisualizationService) => {
    const matrix = service.getBoardMatrix({
      name: 'test',
      dimensions: {
        width: 5,
        height: 8
      },
      shipsLocations: []
    });

    expect(matrix.length).toBe(8);
  }));

  it('should set to true those cell with a ship on it', inject([BoardVisualizationService], (service: BoardVisualizationService) => {
    let matrix = service.getBoardMatrix({
      name: 'test',
      dimensions: {
        width: 5,
        height: 8
      },
      shipsLocations: [
        {
          location: {x: 0, y: 0},
          ship: {
            dimensions: {
              height: 1,
              width: 1
            },
            id: 1
          }
        }
      ]
    });

    expect(matrix[0][0]).toBeTruthy();
    expect(matrix[1][0]).toBeFalsy();
    expect(matrix[0][1]).toBeFalsy();


    matrix = service.getBoardMatrix({
      name: 'test',
      dimensions: {
        width: 5,
        height: 8
      },
      shipsLocations: [
        {
          location: {x: 0, y: 0},
          ship: {
            dimensions: {
              height: 2,
              width: 2
            },
            id: 1
          }
        }
      ]
    });

    expect(matrix[0][0]).toBeTruthy();
    expect(matrix[1][0]).toBeTruthy();
    expect(matrix[0][1]).toBeTruthy();
    expect(matrix[1][1]).toBeTruthy();
    expect(matrix[2][0]).toBeFalsy();
    expect(matrix[0][2]).toBeFalsy();
    expect(matrix[2][1]).toBeFalsy();
    expect(matrix[1][2]).toBeFalsy();
    expect(matrix[2][2]).toBeFalsy();


  }));

});
