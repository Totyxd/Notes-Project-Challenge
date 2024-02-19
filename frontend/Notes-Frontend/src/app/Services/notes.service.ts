import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import Note from '../Interfaces/Note';
import { UserService } from './user.service';
import NoteCreateDto from '../Interfaces/NoteCreateDto';
import NotePatchDto from '../Interfaces/NotePatchDto';

//A generic facade for HttpClient could have been added, but it wasn't done to save development time.

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private url: string = "http://localhost:3000/api/notes";

  private httpClient = inject(HttpClient);
  constructor(private userService: UserService) { }

  getByUserId(archived: boolean = false) {
    const user = this.userService.getUser();
    let uri = this.url + `/user/${user?.id}`;
    if (archived) uri += "/archived";
    return this.httpClient.get<Note[]>(uri, { observe: "response" });
  }


  getById(noteId: number) {
    return this.httpClient.get<Note>(this.url + `/${noteId}`, { observe: "response" });
  }

  createNote(dto: any) {
    return this.httpClient.post<Note>(this.url, dto);
  }

  updateNote(dto: any, noteId: number) {
    return this.httpClient.patch(this.url + `/${noteId}`, dto, { observe: "response" });
  }

  deleteNote(noteId: number) {
    return this.httpClient.delete(this.url + `/${noteId}`);
  }

  addCategory(categoryId: number, noteId: number) {
    return this.httpClient.post(this.url + "/categories/add", { categoryId, noteId });
  }

  removeCategory(categoryId: number, noteId: number) {
    return this.httpClient.delete(this.url + `/categories/remove?categoryId=${categoryId}&noteId=${noteId}`);
  }
}