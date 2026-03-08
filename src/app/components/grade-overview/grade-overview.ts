import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-grade-overview',
  imports: [],
  templateUrl: './grade-overview.html',
  styleUrl: './grade-overview.css',
})
export class GradeOverview {

  protected readonly Number = Number;

  @Input() subject!: string;
  @Input() grade!: string;
}
