import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import User from '../../Interfaces/User';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatCardModule, FormsModule, MatInputModule, MatButtonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router) { }

  async login() {
    if (!this.username || !this.password) {
      return;
    }

    const url = 'http://localhost:3000/api/users/login';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      username: this.username,
      password: this.password,
    };


    const response = await this.httpClient.post(url, body, { headers }).toPromise();
    const res: any = response; // Assuming response is of type any
    console.log(res);

    if (res.status === 400) {
      this.loginError = true;
      return;
    }

    localStorage.setItem('user', JSON.stringify(res.user));
    this.router.navigate(['/myNotes']);

  }
}
