import { Routes } from '@angular/router';
import {Home} from './home/home';
import {Grades} from './grades/grades';

export const routes: Routes = [
  {path: "", component: Home},
  {path: "grades", component: Grades},
];
