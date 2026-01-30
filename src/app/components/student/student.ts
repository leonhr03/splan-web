import {Component, Input, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-student',
  imports: [
    NgIf
  ],
  templateUrl: './student.html',
  styleUrl: './student.css',
})
export class Student implements OnInit {
  @Input() student!: string;
  @Input() class!: string;
  @Input() subject!: string;
  exam: string | null = "";
  oral: string | null = "";
  other: string | null = "";
  ges: string | null = "";

  ngOnInit() {
    this.exam = localStorage.getItem(`${this.class}/${this.subject}/${this.student}/avrExam`)
    this.oral = localStorage.getItem(`${this.class}/${this.subject}/${this.student}/avrOral`)
    this.other = localStorage.getItem(`${this.class}/${this.subject}/${this.student}/avrOther`)
    this.ges = localStorage.getItem(`${this.class}/${this.subject}/${this.student}/avrGes`)
  }

}
