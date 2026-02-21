import { Routes } from '@angular/router';
import {Class} from './class/class';
import {Grades} from './grades/grades';
import {Calendar} from './calendar/calendar';
import {Timetable} from './timetable/timetable';
import {Home} from './home/home';

export const routes: Routes = [
  {path: "", component: Home},
  {path: "class", component: Class},
  {path: "grades", component: Grades},
  {path: "calendar", component: Calendar},
  {path: "timetable", component: Timetable},
];
