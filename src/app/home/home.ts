import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {TimetableItem} from '../components/timetable-item/timetable-item';
import {ClassItem} from '../components/class-item/class-item';
import {Router} from '@angular/router';
import {DateItem} from '../components/date-item/date-item';

@Component({
  selector: 'app-home',
  imports: [
    NgForOf,
    TimetableItem,
    NgIf,
    ClassItem,
    DateItem
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  constructor(private route: Router) { }
  timetable: any[] = []
  classes: any[] = []
  dates: any[] = []
  today: string = ""



  ngOnInit() {
    this.loadTimetable()
    this.loadClasses()
    this.loadDates()
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
    const today = days[4]

    this.today = today

    const stored = localStorage.getItem(`${today}`);
    this.timetable = stored ? JSON.parse(stored) : [];

  }

  loadClasses(){
    const classes: any[] = []

    this.timetable.forEach(day => {
      classes.push(day.class)
    })

    this.classes = classes
  }

  loadDates(){
    const currentDate= new Date().toISOString().split('T')[0];

    const stored = localStorage.getItem("dates");
    const parsed = stored ? JSON.parse(stored) : [];

    const dates = parsed.filter((d: any) => d.start === currentDate)

    this.dates = dates

  }

  goToClass(subject: string, className: string){
    this.route.navigate(['/class'], {
      queryParams: {class: className, subject: subject}
    });
  }
}
