import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
})
export class AdminHeaderComponent implements OnInit {
  
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {}

  public logout(): void {
    this.loginService.logout().subscribe((result) => {
      if (!result) console.error('error logging out');
    });
    this.router.navigate(['login']);
  }
}
