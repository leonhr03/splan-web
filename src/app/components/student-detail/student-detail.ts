import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-student-detail',
  imports: [
    MatIcon
  ],
  templateUrl: './student-detail.html',
  styleUrl: './student-detail.css',
})
export class StudentDetail {
  @Input() student!: string;
  @Input() className!: string;
  @Input() birthday!: string;

  @Output() show = new EventEmitter();

  click(){
    this.show.emit(this.student);
  }

}
