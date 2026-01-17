import { Component } from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [
    NgIf
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  page = "login"
}
