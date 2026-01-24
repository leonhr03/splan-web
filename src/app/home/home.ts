import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ClassItem} from '../components/class-item/class-item';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    ClassItem,
    NgIf,
    FormsModule,
    NgForOf
  ],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home implements OnInit {
  constructor(private cdr: ChangeDetectorRef) { }
  showAddClass = false
  newClass: string = ""
  newSubject: string = ""
  showAddSubject = false
  classes: any[] = []
  currentClass: string = ""
  students: any = []


  ngOnInit() {
    const stored = localStorage.getItem('class');
    const parsed = stored ? JSON.parse(stored) : [];
    this.classes = parsed;
  }

  async addClass() {
    if (!this.newClass.trim()) return;

    const stored = localStorage.getItem('class');
    const parsed = stored ? JSON.parse(stored) : [];
    const newList = [{ class: this.newClass.trim() }, ...parsed];
    localStorage.setItem("class", JSON.stringify(newList));
    this.classes = newList;
    this.newClass = "";
    this.showAddClass = false;
  }

  async addSubject() {
    if (!this.newSubject.trim()) return;
    const stored = localStorage.getItem(`${this.currentClass}/subjects`);
    const parsed = stored ? JSON.parse(stored) : [];
    const newList = [{ subject: this.newSubject.trim() }, ...parsed];
    localStorage.setItem(`${this.currentClass}/subjects`, JSON.stringify(newList));
    this.newSubject = "";
    this.showAddSubject = false;
    window.location.reload();
  }

  loadStudents(subject: string) {
    const stored = localStorage.getItem(`${this.currentClass}/${subject}/students`);
    this.students = stored ? JSON.parse(stored) : [];
  }

}
