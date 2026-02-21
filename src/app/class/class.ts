import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ClassItem} from '../components/class-item/class-item';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Student} from '../components/student/student';
import {Router} from '@angular/router';

@Component({
  selector: 'app-class',
  imports: [
    ClassItem,
    NgIf,
    FormsModule,
    NgForOf,
    Student
  ],
  standalone: true,
  templateUrl: './class.html',
  styleUrl: './class.css',
})

export class Class implements OnInit {
  constructor(private route: Router) { }
  showAddClass = false
  newClass: string = ""
  newSubject: string = ""
  showAddSubject = false
  classes: any[] = []
  currentClass: string = ""
  students: any = []
  currentSubject: string = ""
  newStudent: string = ""
  showAddStudent = false


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

  loadStudents(subject: string, className: string) {
    this.currentSubject = subject;
    const stored = localStorage.getItem(`${className}/${subject}/students`);
    this.students = stored ? JSON.parse(stored) : [];
    console.log(this.students)
  }

  addStudent(){
    const stored = localStorage.getItem(`${this.currentClass}/${this.currentSubject}/students`);
    const parsed = stored ? JSON.parse(stored) : [];
    const newList = [{student: this.newStudent}, ...parsed]
    localStorage.setItem(`${this.currentClass}/${this.currentSubject}/students`, JSON.stringify(newList));
    this.students = newList;
    this.newStudent = "";
    this.showAddStudent = false;
  }

  goToGrades(student: string) {
    this.route.navigate(['/grades'], {
      queryParams: {student: student, class: this.currentClass, subject: this.currentSubject}
    });
  }
}
