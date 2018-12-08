import { Component, OnInit, OnChanges, Input, Output, HostBinding, HostListener, ElementRef, Renderer2, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'role': 'button'
  }
})
export class CellComponent implements OnInit, OnChanges {

  idPrefix = 'board__cell--';

  @Input()
  verticalIndex: number;

  @Input()
  horizontalIndex: number;

  @Input()
  occupied: boolean;

  @Input()
  fired: boolean;

  @Output()
  fireEvent = new EventEmitter<{verticalIndex: number, horizontalIndex: number}>();

  @HostBinding()
  id: string;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.setId();
  }

  ngOnChanges() {
    this.setFiredClass();
    this.setOccupiedClass();
  }

  private setId() {
    this.id = this.idPrefix + this.verticalIndex + '-' + this.horizontalIndex;
  }

  private setFiredClass() {
    if (this.fired) {
      this.renderer.addClass(this.elementRef.nativeElement, 'fired');
      this.renderer.addClass(this.elementRef.nativeElement, 'disabled');
    }
  }

  private setOccupiedClass() {
    if (this.occupied) {
      this.renderer.addClass(this.elementRef.nativeElement, 'occupied');
    }
  }

  @HostListener('click')
  private setFired() {
    if (!this.fired) {
      this.fired = true;
      this.setFiredClass();
      this.fireEvent.emit({
        verticalIndex: this.verticalIndex,
        horizontalIndex: this.horizontalIndex
      });
    }
  }
}
