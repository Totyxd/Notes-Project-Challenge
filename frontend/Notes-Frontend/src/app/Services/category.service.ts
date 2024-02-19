import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Category from '../Interfaces/Category';
import Note from '../Interfaces/Note';
import { NotesService } from './notes.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient, private notesService: NotesService) { }

  getAllCategories() {
    return this.httpClient.get<Category[]>("http://localhost:3000/api/categories", { observe: "response" });
  }

  getNotesByCategory(categoryid: number, archived: boolean = false) {
    let url: string = `http://localhost:3000/api/categories/${categoryid}`;
    if (archived) url += "/archived";
    else url += "/notes";

    return this.httpClient.get<Note[]>(url, { observe: "response" });
  }

}
