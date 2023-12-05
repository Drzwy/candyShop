import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public username: FormControl = new FormControl('', [Validators.required]);
  public password: FormControl = new FormControl('', [
    Validators.minLength(4),
    Validators.required,
  ]);

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {}

  public login(username: string, password: string): boolean {
    let success: boolean = false;
    this.loginService
    .login(username, password)
    .subscribe((response) => {
      if (response) {
        this.router.navigate(['home']);
        success = true;
      } else {
        alert('Usuario incorrecto');
      }
    });
    return success;
  }

  public register(username: string, password: string): boolean {
    let success: boolean = false;
    this.loginService.registerUser(username, password).subscribe((response) => {
      if (response) {
        success = true;
      } else {
        alert('error');
      }
    });
    return success;
  }

  public showusers(): void {
    this.loginService.showusers();
  }
}
