import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';
import { UserRole } from '../models/User';

export const authGuard: CanActivateFn = (route, state) => {
  const login = inject(LoginService);
  return login.isLoggedIn();
};

export const alreadyLoggedGuard: CanActivateFn = (route, state) => {
  const login = inject(LoginService);
  return login.isAlreadyLogged();
};

export const adminGuard: CanActivateFn = (route, state) => {
  const login = inject(LoginService);
  return login.isAuthorized(UserRole.Admin);
};

export const notAdminGuard: CanActivateFn = (route, state) => {
  const login = inject(LoginService);
  return login.isAuthorized(UserRole.User);
};
