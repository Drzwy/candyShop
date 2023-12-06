import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CandyStorage } from 'src/app/models/CandyStorage';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit, OnDestroy {
  public cart: CandyStorage[] = [];

  public subscription!: Subscription;
  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.subscription = this.storeService.checkCart().subscribe((cart) => {
      this.cart = cart;
    });
  }

  ngOnDestroy(): void {}

  public remove(candyStorage: CandyStorage) {
    this.storeService.removeFromCart(candyStorage).subscribe((result) => {
      if (result) {
        console.log('enhorabuena');
      }
    });
  }

  public calcTotal(): number {
    let total = 0;
    for (let CS of this.cart) {
      total += CS.stock * CS.candy.price;
    }
    return total
  }
}
