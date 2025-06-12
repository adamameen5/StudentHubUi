import {
  Directive,
  HostListener,
  Output,
  EventEmitter,
  ElementRef
} from '@angular/core';

@Directive({
  selector: '[appDropdownPosition]'
})
export class DropdownPositionDirective {
  @Output() appDropdownPositionChange = new EventEmitter<'up' | 'down'>();

  constructor(private el: ElementRef) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const position: 'up' | 'down' = spaceBelow < 170 ? 'up' : 'down';

    this.appDropdownPositionChange.emit(position);
  }
}
