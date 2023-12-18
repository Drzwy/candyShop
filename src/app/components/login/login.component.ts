import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/models/User';
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
  public type: FormControl = new FormControl('user');

  public types: string[] = Object.values(UserRole);

  public isRegistering: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {}

  public login(username: string, password: string): boolean {
    let success: boolean = false;
    this.loginService.login(username, password).subscribe((user) => {
      console.log(user);

      if (!user) {
        alert('Usuario incorrecto');
        return;
      }

      if (user?.getType == UserRole.Admin) {
        this.router.navigate(['admin']);
      } else {
        this.router.navigate(['home']);
      }
      success = true;
    });
    return success;
  }

  public toggleRegistering() {
    this.isRegistering = !this.isRegistering;
    this.username.setValue('');
    this.password.setValue('');
  }

  public register(username: string, password: string, type: string): boolean {
    let success: boolean = false;
    this.loginService
      .registerUser(username, password, type)
      .subscribe((response) => {
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
