import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Candy } from 'src/app/models/Candy';
import { CandyStorage } from 'src/app/models/CandyStorage';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
})
export class CatalogoComponent implements OnInit, OnDestroy {
  public storage: CandyStorage[] = [];
  private sub: Subscription = new Subscription();

  constructor(private storeService: StoreService) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    this.sub = this.storeService.checkStorage().subscribe((storage) => {
      this.storage = storage;
    });
  }
}
