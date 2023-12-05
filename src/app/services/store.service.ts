import { Injectable, ɵɵtrustConstantHtml } from '@angular/core';
import { CandyStorage } from '../models/CandyStorage';
import { Observable, catchError, of } from 'rxjs';
import { Candy } from '../models/Candy';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private storage: CandyStorage[] = [];
  private cart: CandyStorage[] = [];

  constructor() {
    this.storage.push(
      new CandyStorage(
        new Candy(
          'caca',
          'caca',
          'caca',
          'caca',
          'https://www.funtastyc.es/blog/wp-content/uploads/2023/03/receta_como_hacer_caramelos-1-810x560.jpg'
        ),
        10
      )
    );
  }

  public checkStorage(): Observable<CandyStorage[]> {
    return of(this.storage);
  }

  public printCart(): void {
    console.log(this.cart);
  }

  public insertStore(candy: Candy, stock: number): Observable<boolean> {
    let success: boolean = false;
    let newCandyStorage = new CandyStorage(candy, stock);
    if (stock > 1) {
      success = true;
      this.storage.push(newCandyStorage);
    }

    return of(success);
  }

  public removeCandy(candy: Candy): Observable<boolean> {
    let success = false;

    let counter = 0;
    let found = false;
    for (let candyStorage of this.storage) {
      counter++;
      if (candyStorage.candy == candy) {
        found = true;
        break;
      }
    }

    if (!found) {
      return of(success);
    }

    try {
      this.storage.splice(counter, 1);
      success = true;
    } catch {
      throw Error('no se pudo eliminar por alguna razon');
    } finally {
      return of(success);
    }
  }

  public changeStock(candy: Candy, storageChange: number): boolean {
    let success = false;
    for (let candyStorage of this.storage) {
      if (candyStorage.candy == candy) {
        candyStorage.changeStock(storageChange);
        success = true;
      }
    }
    return success;
  }

  public addToCart(candy: Candy, quantity: number): Observable<boolean> {
    let success = false;
    try {
      this.changeStock(candy, quantity);
      this.cart.push(new CandyStorage(candy, quantity));
      success = true;
    } catch {
      alert('error');
    } finally {
      return of(success);
    }
  }
}
