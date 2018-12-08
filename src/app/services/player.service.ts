import { Injectable } from '@angular/core';
import { Player } from '../models/player';
import { Point } from '../models/point';
import { Observable } from 'rxjs/Observable';
import { BoardService } from './board.service';

@Injectable()
export class PlayerService {

  constructor(
    private boardService: BoardService
  ) { }

  bomb(player: Player, location: Point) {
    if (!this.boardService.checkPointIsFree(location)) {
      player.score++;
    }
  }

}
