import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {StudentDetail} from '../components/student-detail/student-detail';
import {FormBuilder, FormsModule} from '@angular/forms';
import {skipUntil} from 'rxjs';
import {GradeOverview} from '../components/grade-overview/grade-overview';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-manage-student',
  standalone: true,
  imports: [
    NgIf,
    StudentDetail,
    NgForOf,
    FormsModule,
    GradeOverview,
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
  overwatch: boolean = false
  currentClass: string = ''
  currentStudent: string = ""
  currentDate: string = ""

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
    this.currentStudent = name;
    this.currentClass = className;
    this.currentDate = new Date().toLocaleDateString('de-DE');
    const storedSubjects = localStorage.getItem(`${className}/subjects`);
    const subjects = storedSubjects ? JSON.parse(storedSubjects) : [];

    subjects.forEach((subject: any) => {
      const grade = localStorage.getItem(`${className}/${subject.subject}/${name}/avrGes`)
      const newGrades = [...this.grades, {subject: subject.subject, grade: grade}];
      this.grades = newGrades;
    })

    console.log(this.grades)
    this.overwatch = true
    this.cdr.detectChanges()
  }

  generatePdf() {

    const element = document.getElementById('pdfContent');

    html2canvas(element!).then(canvas => {

      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');

      const width = 210;
      const height = canvas.height * width / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, width, height);

      pdf.save('grades.pdf');

    });

  }
}

export default ManageStudent
