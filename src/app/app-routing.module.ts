import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './components/store/store.component';
import { LoginComponent } from './components/login/login.component';
import {
  adminGuard,
  alreadyLoggedGuard,
  authGuard,
  notAdminGuard,
} from './guards/auth.guard';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [alreadyLoggedGuard],
  },
  {
    path: 'home',
    component: StoreComponent,
    canActivate: [authGuard, notAdminGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
