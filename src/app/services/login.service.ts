import { Location } from '@angular/common';
import { Injectable, OnInit } from '@angular/core';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService implements OnInit {
  private users: User[] = [];
  private activeUser: string = '';

  constructor(private location: Location, private router: Router) {
    this.users.push(new User('caca', 'caca'));
  }

  ngOnInit(): void {}

  public login(username: string, password: string): Observable<boolean> {
    let success: boolean = this.checkUser(username, password);

    if (success) {
      const token: string = btoa(username);
      sessionStorage.setItem('token', token);
    }

    return of(success);
  }

  public logout(): Observable<boolean> {
    let success: boolean = false;
    if (sessionStorage.getItem('token')) {
      sessionStorage.removeItem('token');
      success = true;
    }

    return of(success);
  }

  public checkUser(username: string, password: string): boolean {
    let found: boolean = false;
    this.users.forEach((user) => {
      console.log(user);
      if (username === user.getUsername && password === user.getPassword) {
        found = true;
      }
    });
    return found;
  }

  public isLoggedIn(): Observable<boolean> {
    let token = sessionStorage.getItem('token');
    let loggedIn: boolean = false;

    if (token) {
      loggedIn = true;
    }

    return of(loggedIn);
  }

  public isAlreadyLogged(): Observable<boolean> {
    let notLoggedIn: boolean = true;
    if (sessionStorage.getItem('token')) {
      notLoggedIn = false;
      this.router.navigate(['home']);
      confirm('No puedes ir al login');
    }

    return of(notLoggedIn);
  }

  public registerUser(username: string, password: string): Observable<boolean> {
    let success = false;
    try {
      console.log(username);
      let newuser = new User(username, password);
      this.users.push(newuser);
    } catch {
      return of(success);
    } finally {
      success = true;
    }

    return of(success);
  }

  public showusers() {
    console.log(this.users);
  }
}
