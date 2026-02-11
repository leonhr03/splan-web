import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-grade-component',
  imports: [],
  templateUrl: './grade-component.html',
  styleUrl: './grade-component.css',
})
export class GradeComponent {
  @Input() grade!: string;
  @Input() name!: string;
  protected readonly Number = Number;
}
