import { SlicePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Candy } from 'src/app/models/Candy';
import { CandyStorage } from 'src/app/models/CandyStorage';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-candy',
  templateUrl: './candy.component.html',
  styleUrls: ['./candy.component.css'],
})
export class CandyComponent implements OnInit {
  @Input({ required: true }) candyStorage!: CandyStorage;
  public stockChange: FormControl = new FormControl(0, [
    Validators.min(1),
    Validators.required,
  ]);

  constructor(private storeService: StoreService) {}

  ngOnInit() {}

  public changeOne(number: number) {
    this.stockChange.setValue(this.stockChange.value + number);
  }

  public addCandyToCart(): boolean {
    let success = false;

    if (this.stockChange.value <= 0) {
      alert('Agrega un número válido de productos');
      return false;
    }

    if (this.candyStorage.stock < this.stockChange.value) {
      alert('No existe stock suficiente para que pidas esa cantidad');
      return false;
    }

    this.storeService
      .addToCart(this.candyStorage.candy, this.stockChange.value)
      .subscribe((result) => {
        if (result) {
          success = true;
          this.stockChange.setValue(0);
        }
      });
    return success;
  }

  public validateInput() {
    let inputValue = this.stockChange.value;
    let stock = this.candyStorage.stock;
    
    if (inputValue > stock) {
      this.stockChange.setValue(stock);
    } else if (inputValue < 0) {
      this.stockChange.setValue(0);
    }
  }
}
