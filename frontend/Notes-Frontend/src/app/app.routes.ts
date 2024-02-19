import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { MyNotesComponent } from './Components/my-notes/my-notes.component';
import { NoteComponent } from './Components/note/note.component';

export const routes: Routes = [
    {
        path: "",
        component: LoginComponent
    },
    {
        path: "myNotes",
        component: MyNotesComponent
    },
    {
        path: "myNotes/:noteId",
        component: NoteComponent
    }
];
