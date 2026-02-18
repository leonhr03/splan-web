import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appLongPress]'
})
export class LongPressDirective {
  @Output() longPress = new EventEmitter<void>();

  private timer: any;
  private duration = 600;

  @HostListener('mousedown')
  @HostListener('touchstart')
  start() {
    this.timer = setTimeout(() => {
      this.longPress.emit();
    }, this.duration);
  }

  @HostListener('mouseup')
  @HostListener('mouseleave')
  @HostListener('touchend')
  end() {
    clearTimeout(this.timer);
  }
}
