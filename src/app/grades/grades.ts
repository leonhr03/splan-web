import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { GradeComponent } from '../components/grade-component/grade-component';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {LongPressDirective} from '../shared/directives/long-press.directive';

@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [
    GradeComponent,
    NgForOf,
    FormsModule,
    NgIf,
    MatIcon,
    LongPressDirective
  ],
  templateUrl: './grades.html',
  styleUrl: './grades.css',
})
export class Grades implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}
  student = '';
  className = '';
  subject = '';
  currentname = ""
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
  get totalWeight(): number {
    return (
      Number(this.weightExam) +
      Number(this.weightOral) +
      Number(this.weightOther)
    );
  }


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

    try {
      const parsed = stored ? JSON.parse(stored) : [];
      this.grades = Array.isArray(parsed) ? parsed : [];
    } catch {
      this.grades = [];
    }

    this.exam = this.grades.filter(g => g.type === 'exam');
    this.oral = this.grades.filter(g => g.type === 'oral');
    this.other = this.grades.filter(g => g.type === 'other');
  }


  addGrade() {

    if (!Array.isArray(this.grades)) {
      this.grades = [];
    }

    if (!this.newName || !this.newGrade || !this.type) return;

    const newItem = {
      name: this.newName,
      grade: this.newGrade,
      type: this.type,
    };

    this.grades.unshift(newItem);

    localStorage.setItem(this.storageKey, JSON.stringify(this.grades));

    this.loadGrades();
    this.handleAvr();

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

    let sum = 0;
    let weightSum = 0;

    if (this.exam.length) {
      // @ts-ignore
      sum += this.avrExam * Number(this.weightExam);
      weightSum += Number(this.weightExam);
    }
    else{

    }

    if (this.oral.length) {
      // @ts-ignore
      sum += this.avrOral * Number(this.weightOral);
      weightSum += Number(this.weightOral);
    }

    if (this.other.length) {
      // @ts-ignore
      sum += this.avrOther * Number(this.weightOther);
      weightSum += Number(this.weightOther);
    }

    if (weightSum === 0) {
      this.avrGes = '-.-';
      return;
    }

    const ges = sum / weightSum;

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
    if(type === 'exam'){ this.weightExam = (Number(this.weightExam) + 5).toString(); return}
    else if(type === 'oral'){ this.weightOral = (Number(this.weightOral) + 5).toString(); return}
    else if(type === 'other'){ this.weightOther = (Number(this.weightOther) + 5).toString(); return}
    else {return}
  }

  subWeight(type: string){
    if(type === 'exam'){ this.weightExam = (Number(this.weightExam) - 5).toString(); return}
    else if(type === 'oral'){ this.weightOral = (Number(this.weightOral) - 5).toString(); return}
    else if(type === 'other'){ this.weightOther = (Number(this.weightOther) - 5).toString(); return}
    else{ return}
  }

  finishEdit() {
    if(this.totalWeight !== 100) alert("please change the Weight. Its not 100%")
    else this.showEdit = false;
    localStorage.setItem(`${this.student}/${this.subject}/${this.className}/weight`, JSON.stringify({
      exam: this.weightExam,
      oral: this.weightOral,
      other: this.weightOther
    }))
    this.handleAvr()
  }

  deleteGrade() {
    this.grades = this.grades.filter(i => i.name !== this.currentname);

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.grades) // ✅ ARRAY speichern!
    );

    this.loadGrades();
    this.handleAvr();
  }
}
