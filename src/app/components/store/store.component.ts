import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {}

  public logout(): void {
    this.loginService.logout().subscribe((result) => {
      if (result) {
        this.router.navigate(['login']);
      } else {
        alert('error');
      }
    });
  }

  
}
