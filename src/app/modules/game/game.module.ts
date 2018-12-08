import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { CellComponent } from './cell/cell.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BoardComponent, CellComponent],
  exports: [
    BoardComponent
  ]
})
export class GameModule { }
