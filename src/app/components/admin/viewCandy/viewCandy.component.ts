import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Candy } from 'src/app/models/Candy';
import { CandyStorage } from 'src/app/models/CandyStorage';
import { AdminService } from 'src/app/services/admin.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-viewCandy',
  templateUrl: './viewCandy.component.html',
  styleUrls: ['./viewCandy.component.css'],
})
export class ViewCandyComponent implements OnInit {
  public candyPreview: CandyStorage = new CandyStorage(
    new Candy(
      'Test',
      'Description',
      'Flavour',
      'Colour',
      1000,
      'https://www.freepnglogos.com/uploads/candy-png/candy-list-phantom-food-drink-emojis-for-use-facebook-29.png'
    ),
    0
  );
  public hasBeenChanged = false;
  public subscription: Subscription = new Subscription();

  constructor(
    private adminService: AdminService,
    private storeService: StoreService
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.adminService.seePreview().subscribe((candyPreview) => {
        this.candyPreview = candyPreview;
      })
      
    );

    this.subscription.add(
      this.adminService.hasChanged().subscribe((hasChanged) => {
        this.hasBeenChanged = hasChanged;
      })
    );

    // FIX: algo de aqui no funciona
    // TODO: preguntar
  }

  public addCandyToStorage() {}
  public caca() {
    console.log(this.candyPreview);
    console.log(this.hasBeenChanged);
  }
}
