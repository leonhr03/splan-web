import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {StudentDetail} from '../components/student-detail/student-detail';
import {FormBuilder, FormsModule} from '@angular/forms';
import {skipUntil} from 'rxjs';

@Component({
  selector: 'app-manage-student',
  standalone: true,
  imports: [
    NgIf,
    StudentDetail,
    NgForOf,
    FormsModule
  ],
  templateUrl: './manage-student.html',
  styleUrl: './manage-student.css',
})
class ManageStudent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) { }
  showAddAlert: boolean = false
  newName: string = ''
  newClass: string = ''
  newBirthDay: string = ''
  students: any[] = [{name: "Max Mustermann", class: "10a", birthday: "10.2.12"}]
  grades: any[] = []

  ngOnInit() {
    this.loadStudents()
  }

  loadStudents() {
    const stored =localStorage.getItem('students');
    this.students = stored ? JSON.parse(stored) : []
  }


  addStudent() {
    const newStudent = {
      name: this.newName,
      class: this.newClass,
      birthday: this.newBirthDay,
      id: crypto.randomUUID()
    }

    const newList: any[] = [newStudent, ...this.students]
    this.students = newList

    localStorage.setItem('students', JSON.stringify(newList))

    this.newName = ""
    this.newClass = ""
    this.newBirthDay = ""
    this.showAddAlert = false
  }


  loadGradeOverwatch(name: string, className: string) {
    const storedSubjects = localStorage.getItem(`${className}/subjects`);
    const subjects = storedSubjects ? JSON.parse(storedSubjects) : [];

    subjects.forEach((subject: any) => {
      const grade = localStorage.getItem(`${className}/${subject}/${name}/avrGes`)
      this.grades.push({subject: subject, grade: grade})
    })

    console.log(this.grades)
    this.cdr.detectChanges()
  }
}

export default ManageStudent
