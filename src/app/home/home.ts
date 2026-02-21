import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {TimetableItem} from '../components/timetable-item/timetable-item';

@Component({
  selector: 'app-home',
  imports: [
    NgForOf,
    TimetableItem,
    NgIf
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  timetable: any[] = []


  ngOnInit() {
    this.loadTimetable()
  }

  loadTimetable() {
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday"
    ]

    const date = new Date()
    const today = days[date.getDay()]

    const stored = localStorage.getItem(`${today}`);
    this.timetable = stored ? JSON.parse(stored) : [];

  }
}
