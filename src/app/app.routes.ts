import { Routes } from '@angular/router';
import {Home} from './home/home';
import {Grades} from './grades/grades';
import {Calendar} from './calendar/calendar';
import {Timetable} from './timetable/timetable';

export const routes: Routes = [
  {path: "", component: Home},
  {path: "grades", component: Grades},
  {path: "calendar", component: Calendar},
  {path: "timetable", component: Timetable},
];
