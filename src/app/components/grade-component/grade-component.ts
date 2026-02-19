import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-grade-component',
  imports: [
    MatIcon
  ],
  templateUrl: './grade-component.html',
  styleUrl: './grade-component.css',
})
export class GradeComponent {
  @Input() grade!: string;
  @Input() name!: string;
  @Output() delete = new EventEmitter();

  clickDelete() {
    this.delete.emit()
  }

  protected readonly Number = Number;
}
