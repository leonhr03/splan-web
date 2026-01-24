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
  marks: any[] = [];

  ngOnInit() {
    const stored = localStorage.getItem(`${this.class}/${this.student}/marks`);
    const parsed = stored ? JSON.parse(stored) : [];
    this.marks = parsed;
  }

}
