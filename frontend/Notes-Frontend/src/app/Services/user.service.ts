import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from '../Interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    window.addEventListener("storage", () => {
      this.router.navigate(["/"]);
    });
  }

  getUser(): User | null {
    const jsonUser: string | null = localStorage.getItem("user");
    if (jsonUser) {
      const user: User = JSON.parse(jsonUser);
      return user;
    } else return null;
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(["/"]);
  }
}
