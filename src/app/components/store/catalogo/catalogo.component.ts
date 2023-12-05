import { Component, OnDestroy, OnInit } from '@angular/core';
import { Candy } from 'src/app/models/Candy';
import { CandyStorage } from 'src/app/models/CandyStorage';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
})
export class CatalogoComponent implements OnInit {
  public storage: CandyStorage[] = [];

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.storeService.checkStorage().subscribe((storage) => {
      this.storage = storage;
    });
  }

  


}
