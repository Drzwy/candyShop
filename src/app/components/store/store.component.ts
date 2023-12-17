import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit, OnDestroy {
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {}

  ngOnDestroy(): void {}

  public logout(): void {
    this.loginService.logout().subscribe((result) => {
      if (!result) console.error('error logging out');
    });
    this.router.navigate(['login']);
  }
}
