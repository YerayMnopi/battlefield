import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellComponent } from './cell.component';

describe('CellComponent', () => {
  let component: CellComponent;
  let fixture: ComponentFixture<CellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have four inputs', () => {
    expect(component.verticalIndex).toBeUndefined();
    expect(component.horizontalIndex).toBeUndefined();
    expect(component.occupied).toBeUndefined();
    expect(component.fired).toBeUndefined();
  });

  it('should set its Id', () => {
    component.verticalIndex = 8;
    component.horizontalIndex = 5;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.id).toBe('board__cell--' + component.verticalIndex + '-' + component.horizontalIndex);
  });

  it('should change color when fired', () => {
    component.fired = true;
    component.ngOnChanges();
    fixture.detectChanges();
    expect(fixture.debugElement.classes.fired).toBeTruthy();
  });

  it('should change color when fired and occupied', () => {
    component.fired = true;
    component.occupied = true;
    component.ngOnChanges();
    fixture.detectChanges();
    expect(fixture.debugElement.classes.fired).toBeTruthy();
    expect(fixture.debugElement.classes.occupied).toBeTruthy();

  });

  it('should set to fired when clicked', () => {
    fixture.debugElement.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(component.fired).toBeTruthy();
  });

  it('should emit a fire event on click if not already fired', () => {
    let fireEventEmitted = false;
    component.fireEvent.subscribe( (fire: boolean) => {
      fireEventEmitted = true;
    });

    fixture.debugElement.triggerEventHandler('click', null);

    expect(fireEventEmitted).toBeTruthy();
  });
});
