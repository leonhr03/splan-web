import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { GradeComponent } from '../components/grade-component/grade-component';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-grades',
  imports: [
    GradeComponent,
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './grades.html',
  styleUrl: './grades.css',
})
export class Grades implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}
  student = '';
  className = '';
  subject = '';
  grades: any[] = [];
  exam: any[] = [];
  oral: any[] = [];
  other: any[] = [];
  showAdd = false;
  newName = '';
  newGrade = '';
  type = '';
  avrExam: string = ""
  avrOral: string = ""
  avrOther: string = ""
  avrGes: string = ""
  weightExam: string = "50"
  weightOther: string = "20"
  weightOral: string = "30"
  showEdit = false
  totalWeight = Number(this.weightExam) + Number(this.weightOral) + Number(this.weightOther)


  private get storageKey(): string {
    return `${this.className}/${this.subject}/${this.student}/grades`;
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.student = params['student'];
      this.className = params['class'];
      this.subject = params['subject'];

      this.loadGrades();
      this.handleAvr()
    });
  }

  loadGrades() {
    const stored = localStorage.getItem(this.storageKey);
    this.grades = stored ? JSON.parse(stored) : [];

    // 🔥 FILTER HIER neu berechnen
    this.exam = this.grades.filter(g => g.type === 'exam');
    this.oral = this.grades.filter(g => g.type === 'oral');
    this.other = this.grades.filter(g => g.type === 'other');
  }

  addGrade() {
    if (!this.newName || !this.newGrade || !this.type) return;

    const newItem = {
      name: this.newName,
      grade: this.newGrade,
      type: this.type,
    };

    this.grades = [newItem, ...this.grades];

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.grades)
    );

    this.loadGrades();
    this.handleAvr();

    // Reset Form
    this.newName = '';
    this.newGrade = '';
    this.type = '';
    this.showAdd = false;
  }

  goBack() {
    localStorage.setItem(`${this.className}/${this.subject}/${this.student}/avrExam`, this.avrExam);
    localStorage.setItem(`${this.className}/${this.subject}/${this.student}/avrOral`, this.avrOral);
    localStorage.setItem(`${this.className}/${this.subject}/${this.student}/avrOther`, this.avrOther);
    localStorage.setItem(`${this.className}/${this.subject}/${this.student}/avrGes`, this.avrGes);


    this.router.navigate(['/']);
  }

  handleAvr() {
    this.avrExam = this.calcAverage(this.exam);
    this.avrOral = this.calcAverage(this.oral);
    this.avrOther = this.calcAverage(this.other);

    const ges =
      Number(this.avrExam) * (Number(this.weightExam) / 100) +
      Number(this.avrOral) * (Number(this.weightOral) / 100) +
      Number(this.avrOther) * (Number(this.weightOther) / 100);

    console.log(Number(ges.toFixed(2)));
    this.avrGes = ges.toFixed(1);
  }

  calcAverage(list: any[]) {
    if (list.length <= 0) return "-,-"
    let all = 0
    list.forEach(item => {all = all + Number(item.grade)})
    console.log(all.toFixed(1))
    const avr = all / list.length;
    console.log(avr.toFixed(1))
    return avr.toFixed(1)
  }

  adWeight(type: string) {
    if(type === 'exam'){ this.weightExam = (Number(this.weightExam) + 5).toString()}
    if(type === 'oral'){ this.weightOral = (Number(this.weightOral) + 5).toString()}
    if(type === 'other'){ this.weightOther = (Number(this.weightOther) + 5).toString()}
  }

  subWeight(type: string){
    if(type === 'exam'){ this.weightExam = (Number(this.weightExam) - 5).toString()}
    if(type === 'oral'){ this.weightOral = (Number(this.weightOral) - 5).toString()}
    if(type === 'other'){ this.weightOther = (Number(this.weightOther) - 5).toString()}
  }
}
