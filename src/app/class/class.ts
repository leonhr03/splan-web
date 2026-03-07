import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ClassItem} from '../components/class-item/class-item';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Student} from '../components/student/student';
import {ActivatedRoute, Router} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-class',
  imports: [
    ClassItem,
    NgIf,
    FormsModule,
    NgForOf,
    Student,
    MatIcon
  ],
  standalone: true,
  templateUrl: './class.html',
  styleUrl: './class.css',
})

export class Class implements OnInit {
  constructor(private route: Router, private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef) { }
  showAddClass = false
  newClass: string = ""
  newSubject: string = ""
  showAddSubject = false
  classes: any[] = []
  currentClass: string = ""
  students: any = []
  currentSubject: string = ""
  currentStudent: string = ""
  showAddStudent = false
  showChooseAction = false
  searchStudent: string = ""
  storedStudents: any = []
  filteredStudents: any[] = []


  ngOnInit() {
    const stored = localStorage.getItem('class');
    const parsed = stored ? JSON.parse(stored) : [];
    this.classes = parsed;

    this.loadStoredStudents()

    this.activatedRoute.queryParams.subscribe(params => {
      this.currentClass = params['class'];
      this.loadStudents(params['subject'], params['class']);
    })
  }

  loadStoredStudents(){
    const stored = localStorage.getItem('students');
    this.storedStudents = stored ? JSON.parse(stored) : [];
  }

  filterStudents(){
    this.filteredStudents = this.storedStudents.filter((s: any) =>
      s.name.toLowerCase().includes(this.searchStudent.toLowerCase())
    )
    this.cdr.detectChanges();
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

  addStudent(id: string) {
    const newStudent = this.storedStudents.find((s: any) => s.id === id);
    const students = localStorage.getItem(`${this.currentClass}/${this.currentSubject}/students`);
    let parsed = students ? JSON.parse(students) : [];
    if (!Array.isArray(parsed)) {
      parsed = [];
    }
    const newList = [...parsed, newStudent];
    localStorage.setItem(
      `${this.currentClass}/${this.currentSubject}/students`,
      JSON.stringify(newList)
    );
    this.loadStudents(this.currentSubject, this.currentClass);
    this.showAddStudent = false;
  }

  goToGrades() {
    this.route.navigate(['/grades'], {
      queryParams: {student: this.currentStudent, class: this.currentClass, subject: this.currentSubject}
    });
  }

  goToNotes() {
    this.route.navigate(['/notes'], {
      queryParams: {student: this.currentStudent, class: this.currentClass, subject: this.currentSubject}
    });
  }
}
