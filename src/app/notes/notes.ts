import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NoteItem} from '../components/note-item/note-item';

@Component({
  selector: 'app-notes',
  imports: [
    NgIf,
    FormsModule,
    NoteItem,
    NgForOf
  ],
  templateUrl: './notes.html',
  styleUrl: './notes.css',
})
export class Notes implements OnInit{
  constructor(private activatedRoute: ActivatedRoute, private route: Router, private cdr: ChangeDetectorRef) {}
  student: string = ""
  subject: string = ""
  className: string = ""
  notes: any[] = []
  showEditScreen = false

  newHeading: string = ""
  newContent: string = ""


  ngOnInit() {
    this.loadNotes();
  }

  loadNotes(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.student = params['student'];
      this.subject = params['subject'];
      this.className = params['class'];
    })

    const stored = localStorage.getItem(`${this.className}/${this.subject}/${this.student}/notes`)
    const parsed = stored ? JSON.parse(stored) : [];
    this.notes = parsed;
  }

  addNote() {
    const newNoteItem = {
      heading: this.newHeading,
      content: this.newContent
    };

    const index = this.notes.findIndex(n => n.heading === this.newHeading);

    if (index !== -1) {
      this.notes[index] = newNoteItem;
    } else {
      this.notes.push(newNoteItem);
    }

    localStorage.setItem(
      `${this.className}/${this.subject}/${this.student}/notes`,
      JSON.stringify(this.notes)
    );

    this.showEditScreen = false;
    this.cdr.detectChanges();
  }


  loadDetails(heading: string){
    const currentNote = this.notes.filter(n => n.heading === heading)
    this.newHeading = currentNote[0].heading
    this.newContent = currentNote[0].content
    this.showEditScreen = true
  }
}
