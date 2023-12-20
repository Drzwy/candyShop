import { Location } from '@angular/common';
import { Injectable, OnInit } from '@angular/core';
import { User, UserRole } from '../models/User';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService implements OnInit {
  private users: User[] = [];

  constructor(private location: Location, private router: Router) {
    // aqui se registran los usuarios (simula backend)
    this.users.push(new User('caca', 'caca', UserRole.User));
    this.users.push(new User('popo', 'popo', UserRole.Admin));
  }

  ngOnInit(): void {}

  public login(
    username: string,
    password: string
  ): Observable<User | undefined> {
    const foundUser = this.checkUser(username, password);
    console.log(foundUser);

    if (!foundUser) {
      return of(foundUser);
    }

    const token: string = btoa(username);
    sessionStorage.setItem('token', token);
    return of(foundUser);
  }

  public checkUser(username: string, password: string): User | undefined {
    let foundUser: User | undefined;
    this.users.forEach((user) => {
      if (username === user.getUsername && password === user.getPassword) {
        foundUser = user;
      }
    });
    return foundUser;
  }

  public logout(): Observable<boolean> {
    let success: boolean = false;
    if (sessionStorage.getItem('token')) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('cart');
      success = true;
    }

    return of(success);
  }

  public isLoggedIn(): Observable<boolean> {
    let loggedIn: boolean = false;

    if (sessionStorage.getItem('token')) {
      loggedIn = true;
    } else {
      this.location.back();
      setTimeout(() => {
        console.error('ili notloged');

        confirm('No estás logeado');
      }, 1);
    }

    return of(loggedIn);
  }

  public isAlreadyLogged(): Observable<boolean> {
    let notLoggedIn: boolean = true;
    if (sessionStorage.getItem('token')) {
      notLoggedIn = false;
      this.location.back();
      setTimeout(() => {
        console.error('ial notloged');

        confirm('Ya estás logeado');
      }, 1);
    }

    return of(notLoggedIn);
  }

  public isAuthorized(requiredRole: UserRole): Observable<boolean> {
    let isAuthorized = false;
    let user = sessionStorage.getItem('token');

    if (!user) {
      this.router.navigate(['login']);
      setTimeout(() => {
        console.error('ia not logged in');
        confirm('No estás logeado');
      }, 1);
      return of(isAuthorized);
    }

    user = atob(user);
    let userRole = this.checkUserType(user);

    if (userRole !== requiredRole) {
      this.location.back();
      setTimeout(() => {
        console.error('no coincide el rol');
        confirm('No tienes los permisos necesarios');
      }, 1);
      return of(isAuthorized);
    }

    isAuthorized = true;
    return of(isAuthorized);
  }

  public checkUserType(username: string): string {
    let userType: string = UserRole.User;
    for (let user of this.users) {
      if (user.getUsername === username) {
        userType = user.getType;
        break;
      }
    }
    return userType;
  }

  public registerUser(
    username: string,
    password: string,
    type: string
  ): Observable<boolean> {
    let success = false;
    try {
      let newuser = new User(
        username,
        password,
        type == UserRole.User ? UserRole.User : UserRole.Admin
      );
      for (let user of this.users) {
        if ((username === user.getUsername)) {
          alert('Usuario ya registrado');
          throw 'Usuario ya registrado';
        }
      }
      this.users.push(newuser);
      console.log(newuser);
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
