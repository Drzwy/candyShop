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

  public subscription: Subscription = new Subscription();

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {}

  public changeOne(stockChange: number): void {
    this.candyTaken.stock += stockChange;
  }

  public deleteCandy(): void {
    this.destroy.emit(this.candyTaken);
  }
}
