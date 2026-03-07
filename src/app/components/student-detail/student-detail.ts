import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-student-detail',
  imports: [],
  templateUrl: './student-detail.html',
  styleUrl: './student-detail.css',
})
export class StudentDetail {
  @Input() student!: string;
  @Input() className!: string;
  @Input() birthday!: string;

}
