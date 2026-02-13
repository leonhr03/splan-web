import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FullCalendarModule} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

import { ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    FullCalendarModule,
    NgIf,
    FormsModule
  ],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar implements OnInit, AfterViewInit {
  @ViewChild(FullCalendarComponent) calendar!: FullCalendarComponent;
  constructor(private cdr: ChangeDetectorRef) {
  }
  showAdd = false;
  currentDateFormated = ""
  currentDate = ""
  newDateDescription: string = ""
  dates: any[] = []


  formatDate(dateStr: string): string {
    const [year, month, day] = dateStr.split('-');
    return `${day}.${month}.${year}`;
  }


  calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    eventDisplay: 'block',
    dayMaxEventRows: false,
    eventTextColor: '#000',
    dateClick: (info: any) => {
      console.log('Date clicked:', info.dateStr);
      this.showAdd = true;
      this.currentDateFormated = this.formatDate(info.dateStr);
      this.currentDate = info.dateStr;
      this.cdr.detectChanges();
    },
  };

  ngOnInit() {
    this.loadDates()
  }

  ngAfterViewInit() {
    this.loadDatesIntoCalendar();
  }

  loadDates() {
    const stored = localStorage.getItem('dates');

    try {
      const parsed = stored ? JSON.parse(stored) : [];
      this.dates = Array.isArray(parsed) ? parsed : [];
    } catch {
      this.dates = [];
    }
  }

  loadDatesIntoCalendar() {
    const calendarApi = this.calendar.getApi();

    this.dates.forEach(event => {
      calendarApi.addEvent(event);
    });
  }

  addDate() {
    if (!this.newDateDescription) return;

    const calendarApi = this.calendar.getApi();

    calendarApi.addEvent({
      title: this.newDateDescription,
      start: this.currentDate,
      allDay: true
    });

    const newList = [...this.dates, {
      title: this.newDateDescription,
      start: this.currentDate,
      allDay: true
    }]

    this.dates = newList;

    console.log(this.dates)

    localStorage.setItem("dates", JSON.stringify(newList))

    this.showAdd = false;
    this.newDateDescription = '';
  }
}
