import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { StoreComponent } from './components/store/store.component';
import { CandyComponent } from './components/candy/candy.component';
import { CatalogoComponent } from './components/store/catalogo/catalogo.component';
import { CarritoComponent } from './components/store/carrito/carrito.component';
import { CandyCartComponent } from './components/candy-cart/candy-cart.component';
import { LoginHeaderComponent } from './components/headers/login-header/login-header.component';
import { StoreHeaderComponent } from './components/headers/store-header/store-header.component';
import { AdminHeaderComponent } from './components/headers/admin-header/admin-header.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddCandyComponent } from './components/admin/addCandy/addCandy.component';
import { ViewCandyComponent } from './components/admin/viewCandy/viewCandy.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StoreComponent,
    CandyComponent,
    CatalogoComponent,
    CarritoComponent,
    CandyCartComponent,
    AdminComponent,
    LoginHeaderComponent,
    StoreHeaderComponent,
    AdminHeaderComponent,
    AddCandyComponent,
    ViewCandyComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
