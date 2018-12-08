import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Board } from '../../../models/board';

@Component({
  selector: 'app-game-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnChanges {

  matrix: number[][] = [];

  @Input()
  board: Board;

  @Output()
  attackEvent = new EventEmitter<[number, number]>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.buildMatrix();
  }

  attack(event) {
    console.log('firing to ' + event.verticalIndex + ' - ' + event.horizontalIndex);
    this.attackEvent.emit([event.verticalIndex, event.horizontalIndex]);
  }

  private buildMatrix() {
    const widthArray = Array.from(Array(this.board.dimensions.width).keys());
    const heigthArray = Array.from(Array(this.board.dimensions.height).keys());

    this.matrix = heigthArray.map((verticalIndex: number) => {
      return widthArray;
    });
  }
}
