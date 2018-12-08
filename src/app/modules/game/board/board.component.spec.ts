import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// Components
import { BoardComponent } from './board.component';
import { CellComponent } from '../cell/cell.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardComponent, CellComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a board input', () => {
    expect(component.board).toBeUndefined();
  });

  it('should display de board name', () => {
    component.board = {
      name: 'test',
      dimensions: {
        width: 5,
        height: 8
      },
      shipsLocations: []
    };

    fixture.detectChanges();

    const boardNameHeading: HTMLElement = fixture.debugElement.query(By.css('.board__name')).nativeElement;

    expect(boardNameHeading.innerText).toContain('test');
  });

  it('should build the board matrix', () => {
    component.board = {
      name: 'test',
      dimensions: {
        width: 5,
        height: 8
      },
      shipsLocations: []
    };
    const lastFileIndex = component.board.dimensions.height - 1;
    const lastColumnIndex = component.board.dimensions.width - 1;
    component.ngOnChanges();

    fixture.detectChanges();
    const lastBoardCellSelector: string = '#board__cell--' + lastFileIndex + '-' + lastColumnIndex;
    const lastBoardCell = fixture.debugElement.query(By.css(lastBoardCellSelector));

    expect(lastBoardCell.nativeElement).toBeTruthy();
  });

  it('should emit a player attack on click', () => {
    let verticalAttackTest: number;
    let horizontalAttackTest: number;


    component.board = {
      name: 'test',
      dimensions: {
        width: 5,
        height: 8
      },
      shipsLocations: []
    };
    const lastFileIndex = component.board.dimensions.height - 1;
    const lastColumnIndex = component.board.dimensions.width - 1;


    component.attackEvent.subscribe( ([verticalIndex, horizontalIndex]: [number, number]) => {
      verticalAttackTest = verticalIndex;
      horizontalAttackTest = horizontalIndex;
    });

    const cellIdPrefix = TestBed.createComponent(CellComponent).componentInstance.idPrefix;

    component.ngOnChanges();

    fixture.detectChanges();
    const lastBoardCellSelector: string = '#' + cellIdPrefix + lastFileIndex + '-' + lastColumnIndex;
    const lastBoardCell = fixture.debugElement.query(By.css(lastBoardCellSelector));


    lastBoardCell.triggerEventHandler('click', null);

    expect(verticalAttackTest).toBe(lastFileIndex);
    expect(horizontalAttackTest).toBe(lastColumnIndex);

  });
});
