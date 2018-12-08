import { BrowserModule } from '@angular/platform-browser';
import { GameModule } from './modules/game/game.module';

import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BoardService } from './services/board.service';
import { UtilsService } from './services/utils.service';
import { BoardFactoryService } from './services/board-factory.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GameModule
  ],
  providers: [
    BoardService,
    BoardFactoryService,
    UtilsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
