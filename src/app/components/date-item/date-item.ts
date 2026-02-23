import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-date-item',
  imports: [],
  templateUrl: './date-item.html',
  styleUrl: './date-item.css',
})
export class DateItem {
  @Input() title!: string;
  date = new Date().toLocaleDateString();
}
