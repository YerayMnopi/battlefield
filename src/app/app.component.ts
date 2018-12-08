import { Component, OnInit } from '@angular/core';
import { Board } from './models/board';
import { BoardService } from './services/board.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  board: Board;

  constructor(
    private boardService: BoardService
  ) {}

  ngOnInit() {
    this.boardService.getBoardChanges().subscribe(
      (updatedBoard: Board) => this.board = updatedBoard
    );
  }
}
