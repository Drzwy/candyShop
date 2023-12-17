import { Injectable, OnInit } from '@angular/core';
import { CandyStorage } from '../models/CandyStorage';
import { Observable, of } from 'rxjs';
import { Candy } from '../models/Candy';

@Injectable({
  providedIn: 'root',
})
export class StoreService implements OnInit {
  private storage: CandyStorage[] = [];
  private cart: CandyStorage[] = [];

  constructor() {
    this.constructStorage();
    this.constructCart();
  }

  ngOnInit(): void {}

  private constructCart() {
    let savedcart = sessionStorage.getItem('cart');
    if (savedcart == null) {
      return;
    }
    let cart = atob(savedcart).split(';');
    for (let item of cart) {
      let cs: CandyStorage = JSON.parse(item);
      let candy: Candy = this.findCandy(cs.candy);
      this.addToCart(candy, cs.stock);
    }
  }

  private constructStorage() {
    this.storage.push(
      new CandyStorage(
        new Candy(
          'Paletas',
          'Un surtido de paletas de azúcar',
          'Sabores Surtidos',
          'Colores Surtidos',
          500,
          'https://www.funtastyc.es/blog/wp-content/uploads/2023/03/receta_como_hacer_caramelos-1-810x560.jpg'
        ),
        10
      ),
      new CandyStorage(
        new Candy(
          'Gomitas',
          'Varias gomitas y caramelos muy ácidos!',
          'Manzana, Naranja y Limón',
          'Colores Surtidos',
          1000,
          'https://img2.rtve.es/i/?w=1600&i=1628606891995.jpg'
        ),
        20
      ),
      new CandyStorage(
        new Candy(
          'Chocolates',
          'Múltiples chocolatitos de colores',
          'Chocolate',
          'Colores Surtidos',
          200,
          'https://www.latercera.com/resizer/LqrpUY7U9ddANIXlL_xk354L7Wg=/900x600/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/D3CRXIZHXND2TJFWQK6VC4YSG4.jpeg'
        ),
        5
      )
    );
  }

  public findCandy(candy: Candy): Candy {
    for (let cs of this.storage) {
      if (candy.name === cs.candy.name) {
        return cs.candy;
      }
    }
    console.error('unreachable candy');
    return candy;
  }

  public checkStorage(): Observable<CandyStorage[]> {
    return of(this.storage);
  }

  public checkCart(): Observable<CandyStorage[]> {
    return of(this.cart);
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

  public changeStockInCart(
    candy: Candy,
    storageChange: number
  ): Observable<boolean> {
    let success = false;
    try {
      this.changeStock(candy, storageChange);
      this.saveCart();
      success = true;
    } catch {
      alert('error');
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
      this.addNoDuplicate(candy, quantity);
      this.saveCart();
      success = true;
    } catch {
      alert('error');
    } finally {
      return of(success);
    }
  }

  public addNoDuplicate(candy: Candy, quantity: number): void {
    let found = false;
    for (let candyStorage of this.cart) {
      if (candyStorage.candyName == candy.name) {
        candyStorage.changeStock(-quantity);
        found = true;
      }
    }

    if (!found) {
      let candyStorage = new CandyStorage(candy, quantity);
      this.cart.push(candyStorage);
    }
  }

  public removeFromCart(candyStorage: CandyStorage): Observable<boolean> {
    let success = false;
    try {
      let index = this.cart.indexOf(candyStorage);
      this.cart.splice(index, 1);
      this.changeStock(candyStorage.candy, -candyStorage.stock);
      this.saveCart();
      success = true;
    } catch {
      alert('error');
    } finally {
      return of(success);
    }
  }

  public stockLeftFromCandy(candy: Candy): Observable<number> {
    let stockLeft = -1;

    for (let candyStorage of this.storage) {
      if (candy == candyStorage.candy) {
        stockLeft = candyStorage.stock;
      }
    }

    return of(stockLeft);
  }

  public saveCart() {
    // let cart = JSON.stringify(this.cart);
    // console.log(cart);
    let carttotext = '';
    let count = 0;
    for (let item of this.cart) {
      if (count > 0) {
        carttotext += ';';
      }
      carttotext += `${JSON.stringify(item)}`;

      count++;
    }

    if (carttotext) {
      carttotext = btoa(carttotext);
      sessionStorage.setItem('cart', carttotext);
    } else {
      sessionStorage.removeItem('cart');
    }
  }
}
