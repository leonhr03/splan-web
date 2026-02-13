import {Component, OnInit} from '@angular/core';
import {FullCalendarModule} from '@fullcalendar/angular';
import {NgForOf, NgIf} from '@angular/common';
import {TimetableItem} from '../components/timetable-item/timetable-item';
import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-timetable',
  imports: [
    FullCalendarModule,
    NgForOf,
    TimetableItem,
    MatIcon,
    NgIf,
    FormsModule
  ],
  templateUrl: './timetable.html',
  styleUrl: './timetable.css',
})
export class Timetable implements OnInit {
  monday: any[] = []
  tuesday: any[] = []
  wednesday: any[] = []
  thursday: any[] = []
  friday: any[] = []
  showEdit = false;
  newStartTime: string = "";
  newEndTime: string = "";
  newSubject: string = "";
  currentDay: string = "";
  newClass: string = "";
  showAddAlert = false

  ngOnInit() {
    this.load()
  }

  load() {
    const monday = localStorage.getItem("monday")
    const tuesday = localStorage.getItem("tuesday")
    const wednesday = localStorage.getItem("wednesday")
    const thursday = localStorage.getItem("thursday")
    const friday = localStorage.getItem("friday")

    this.monday = monday ? JSON.parse(monday) : [];
    this.tuesday = tuesday ? JSON.parse(tuesday) : [];
    this.wednesday = wednesday ? JSON.parse(wednesday) : [];
    this.thursday = thursday ? JSON.parse(thursday) : [];
    this.friday = friday ? JSON.parse(friday) : [];
  }


  addSubject() {
    const newListItem = {start: this.newStartTime, end: this.newEndTime, subject: this.newSubject, class: this.newClass};

    switch (this.currentDay) {
      case "mo": {
        this.monday = [...this.monday, newListItem];
        break;
      }
      case "tu": {
        this.tuesday = [...this.tuesday, newListItem];
        break;
      }
      case "we": {
        this.wednesday = [...this.wednesday, newListItem];
        break;
      }
      case "th": {
        this.thursday = [...this.thursday, newListItem];
        break;
      }
      case "fr": {
        this.friday = [...this.friday, newListItem];
        break;
      }
      default: break;


    }
    this.showAddAlert = false;
    this.store()
    console.log(this.monday);
  }

  store() {
    localStorage.setItem("monday", JSON.stringify(this.monday));
    localStorage.setItem("tuesday", JSON.stringify(this.tuesday));
    localStorage.setItem("wednesday", JSON.stringify(this.wednesday));
    localStorage.setItem("thursday", JSON.stringify(this.thursday));
    localStorage.setItem("friday", JSON.stringify(this.friday));
  }
}
