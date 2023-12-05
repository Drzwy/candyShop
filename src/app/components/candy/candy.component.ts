import { SlicePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Candy } from 'src/app/models/Candy';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-candy',
  templateUrl: './candy.component.html',
  styleUrls: ['./candy.component.css'],
})
export class CandyComponent implements OnInit {
  @Input({ required: true }) candy!: Candy;
  public stockChange: FormControl = new FormControl(0, [
    Validators.min(0),
    Validators.max(99),
  ]);

  constructor(private storeService: StoreService) {}

  ngOnInit() {}

  public changeOne(number: number) {
    this.stockChange.setValue(this.stockChange.value + number);
  }

  public addCandyToCart(): boolean {
    let success = false;
    this.storeService
      .addToCart(this.candy, this.stockChange.value)
      .subscribe((result) => {
        if (result) {
          alert('funciono');
          this.storeService.printCart();
          success = true;
        }
      });
    return success;
  }
}
