import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Board } from '../../../models/board';
import { ShipLocation } from '../../../models/ship-location';
import { BoardVisualizationService } from './board-visualization.service';


@Component({
  selector: 'app-game-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  providers: [
    BoardVisualizationService
  ]
})
export class BoardComponent implements OnInit, OnChanges {

  matrix: boolean[][] = [];

  @Input()
  board: Board;

  @Output()
  attackEvent = new EventEmitter<[number, number]>();

  constructor(
    private boardVisualizationService: BoardVisualizationService
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.matrix = this.boardVisualizationService.getBoardMatrix(this.board);
  }

  attack(event) {
    console.log('firing to ' + event.verticalIndex + ' - ' + event.horizontalIndex);
    this.attackEvent.emit([event.verticalIndex, event.horizontalIndex]);
  }

}
