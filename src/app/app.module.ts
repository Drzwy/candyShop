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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StoreComponent,
    CandyComponent,
    CatalogoComponent,
    CarritoComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
