import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userName;

  constructor() { 
    this.userName = localStorage.getItem('userName') || '';
  }

  login(userName: string) { 
    localStorage.setItem('userName', userName);
    this.userName = userName;
  }

  getUser() {
    return this.userName;
  }
}
