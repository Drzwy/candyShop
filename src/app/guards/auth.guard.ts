import { CanActivateFn, RouteConfigLoadEnd } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const login = inject(LoginService);
  return login.isLoggedIn();
};

export const alreadyLoggedGuard: CanActivateFn = (route, state) => {
  const login = inject(LoginService);
  return login.isAlreadyLogged();
};
