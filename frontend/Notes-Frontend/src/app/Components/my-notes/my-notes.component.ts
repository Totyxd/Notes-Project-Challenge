import { Component, Inject, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { NotesService } from '../../Services/notes.service';
import { CategoryService } from '../../Services/category.service';
import { UserService } from '../../Services/user.service';
import Note from '../../Interfaces/Note';
import { MatButtonModule } from '@angular/material/button';
import Category from '../../Interfaces/Category';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-my-notes',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatIconModule, MatListModule, MatButtonModule, MatRadioModule, FormsModule, MatChipsModule, MatBottomSheetModule],
  templateUrl: './my-notes.component.html',
  styleUrl: './my-notes.component.css'
})
export class MyNotesComponent implements OnInit {

  notes: Note[] | null = [];
  categories: Category[] | null = [];
  selectedOption: number | undefined;
  archivedNotes: Note[] | null = [];

  constructor(public noteService: NotesService, public categoryService: CategoryService, public userService: UserService, public router: Router, private _bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
    this.noteService.getByUserId()
      .subscribe((res) => this.notes = res.body);
    this.categoryService.getAllCategories()
      .subscribe((res) => this.categories = res.body);
    this.noteService.getByUserId(true)
      .subscribe((res) => this.archivedNotes = res.body);
  }

  addVirtualNote() {
    this.noteService.createNote({ title: null, content: null, UserId: this.userService.getUser()?.id })
      .subscribe(res => this.notes?.unshift({ ...res, Categories: [] }));
  }

  getByUserId(archived: boolean = false) {
    if (!archived) {
      this.noteService.getByUserId()
        .subscribe((res) => this.notes = res.body);
    } else {
      this.noteService.getByUserId(archived)
        .subscribe(res => this.archivedNotes = res.body);
    }
  }

  archive(event: Event, note: Note) {
    event.stopPropagation();
    this.noteService.updateNote({ archived: true }, note.id)
      .subscribe(res => {
        if (this.notes) this.notes = this.notes?.filter(noteEl => noteEl.id !== note.id);
        if (this.archivedNotes) this.archivedNotes.unshift(note);
      });
  }

  unarchive(event: Event, note: Note) {
    event.stopPropagation();
    this.noteService.updateNote({ archived: false }, note.id)
      .subscribe(res => {
        if (this.archivedNotes) this.archivedNotes = this.archivedNotes?.filter(noteEl => noteEl.id !== note.id);
        if (this.notes) this.notes.unshift(note);
      });
  }

  delete(event: Event, noteId: number) {
    event.stopPropagation();
    this.noteService.deleteNote(noteId)
      .subscribe(res => {
        window.location.reload();
      });
  }

  searchByCategory(categoryId: number, archived: boolean = false) {
    if (!archived) {
      this.categoryService.getNotesByCategory(categoryId)
        .subscribe(res => this.notes = res.body);
    } else {
      this.categoryService.getNotesByCategory(categoryId, archived)
        .subscribe(res => this.archivedNotes = res.body);
    }
  }

  toNestedResource(noteId: number) {
    this.router.navigate([`/myNotes/${noteId}`]);
  }

  openBottomSheet(event: Event, noteId: number, noteCategories: any): void {
    event.stopPropagation();
    this._bottomSheet.open(CatBottomSheet, {
      data: {
        categories: this.categories,
        noteId,
        noteCategories
      }
    });
  }
}


@Component({
  selector: 'cat-bottom-sheet',
  templateUrl: './cat-bottom-sheet.html',
  standalone: true,
  imports: [CommonModule, MatListModule, MyNotesComponent, MatIconModule, MatButtonModule],
})
export class CatBottomSheet implements OnInit {
  categories: Category[] | null = [];
  noteCategories: Category[] | null = [];

  constructor(private _bottomSheetRef: MatBottomSheetRef<CatBottomSheet>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: { categories: Category[], noteId: number, noteCategories: Category[] }, private categoryService: CategoryService, private notesService: NotesService) { }

  ngOnInit(): void {
    this.categories = this.data.categories;
    console.log(this.data.noteCategories);
  }

  addCategory(categoryId: number, noteId: number) {
    this.notesService.addCategory(categoryId, noteId)
      .subscribe(res => {
        window.location.reload();
      });
  }

  removeCategory(event: Event, categoryId: number, noteId: number) {
    event.stopPropagation();
    this.notesService.removeCategory(categoryId, noteId)
      .subscribe(res => {
        window.location.reload();
      });
  }

  seekInNoteCats(categoryId: number): boolean {
    if (this.noteCategories) return this.data.noteCategories.some(cat => cat.id === categoryId);
    else return false;
  }
}