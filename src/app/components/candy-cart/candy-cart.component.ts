import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { CandyStorage } from 'src/app/models/CandyStorage';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-candy-cart',
  templateUrl: './candy-cart.component.html',
  styleUrls: ['./candy-cart.component.css'],
})
export class CandyCartComponent implements OnInit {
  @Input({ required: true }) public candyTaken!: CandyStorage;

  @Output() public destroy: EventEmitter<CandyStorage> =
    new EventEmitter<CandyStorage>();

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {}

  public changeOne(stockChange: number): void {
    this.storeService
      .stockLeftFromCandy(this.candyTaken.candy)
      .subscribe((stockLeft) => {
        if (stockLeft == -1) {
          alert('Error, no se encontró el dulce por alguna razón');
        }
        if (
          this.candyTaken.stock + stockChange < 0 ||
          stockChange > stockLeft
        ) {
          alert('No hay stock disponible para realizar esa operación');
          return;
        }
        if (this.candyTaken.stock + stockChange == 0) {
          this.deleteCandy();
          return;
        }
        this.candyTaken.stock += stockChange;
        this.storeService
          .changeStockInCart(this.candyTaken.candy, stockChange)
          .subscribe((result) => {
            if (!result) alert('error');
          });
      });
  }

  public deleteCandy(): void {
    this.destroy.emit(this.candyTaken);
  }
}
