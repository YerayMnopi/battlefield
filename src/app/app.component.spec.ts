import { TestBed, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BoardService } from './services/board.service';
import { UtilsService } from './services/utils.service';

import { BoardServiceStud } from './studs/board.service.stud';
import { BoardComponent } from './modules/game/board/board.component';
import { BoardFactoryService } from './services/board-factory.service';
import { CellComponent } from './modules/game/cell/cell.component';
import { ShipFactoryService } from './services/ship-factory.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        BoardComponent,
        CellComponent
      ],
      providers: [
        BoardService,
        BoardFactoryService,
        UtilsService,
        ShipFactoryService
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  /*
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));
  */
  it('should have a board property', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.board).toBeUndefined();
  }));

  it('should have a suscription to board changes', async(
    inject([BoardService], (boardService: BoardService) => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;

      boardService.setBoard({
        name: name,
        dimensions: {
          width: 5,
          height: 8
        },
        shipsLocations: []
      });

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(app.board).toBeTruthy();
      });
    }
  )
)
);
});
