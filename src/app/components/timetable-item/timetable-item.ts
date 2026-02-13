import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-timetable-item',
  imports: [],
  templateUrl: './timetable-item.html',
  styleUrl: './timetable-item.css',
})
export class TimetableItem {
  @Input() start: string = "";
  @Input() end: string = "";
  @Input() className: string = "";
  @Input() subject: string = "";
}
