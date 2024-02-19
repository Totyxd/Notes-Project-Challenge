import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from '../../Services/notes.service';
import Note from '../../Interfaces/Note';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent implements OnInit {
  constructor(private activeRoute: ActivatedRoute, private noteService: NotesService, private router: Router, private _snackBar: MatSnackBar) { }
  note: Note | null = null;
  title: string | undefined = this.note?.title;
  content: string | undefined | null = this.note?.content;

  ngOnInit(): void {
    const params = this.activeRoute.snapshot.paramMap;
    const noteId: number = Number(params.get("noteId"));
    this.noteService.getById(noteId)
      .subscribe(res => {
        this.note = res.body;
        console.log(this.note);
      });
  }

  patchNote() {
    console.log(this.title, this.content);
    if (this.note && (this.title || this.content)) {
      this.noteService.updateNote({
        title: this.title,
        content: this.content
      }, this.note?.id)
        .subscribe(res => {
          this.succesfulNoteSave();
        });
    }
  }

  goBack() {
    this.router.navigate(["/myNotes"]);
  }

  onTitleChange(event: any) {
    this.title = event.target.value;
  }

  onContentChange(event: any) {
    this.content = event.target.value;
  }

  succesfulNoteSave() {
    this._snackBar.open("Note saved!", "close");
  }
}
