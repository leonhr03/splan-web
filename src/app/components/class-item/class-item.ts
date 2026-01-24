import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-class-item',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './class-item.html',
  styleUrl: './class-item.css',
})
export class ClassItem implements OnInit {
  @Input() className!: string;
  @Output() submit = new EventEmitter<void>();
  @Output() subject = new EventEmitter<string>();
  showSubjects: boolean = false;
  subjects: any[] = [];

  ngOnInit() {
    const stored = localStorage.getItem(`${this.className}/subjects`);
    this.subjects = stored ? JSON.parse(stored) : null;
  }

  onClick  () {
    this.submit.emit()
  }

  clickSubject (subject: string) {
    this.subject.emit(subject);
  }
}
