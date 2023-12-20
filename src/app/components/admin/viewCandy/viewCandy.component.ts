import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CandyStorage } from 'src/app/models/CandyStorage';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-viewCandy',
  templateUrl: './viewCandy.component.html',
  styleUrls: ['./viewCandy.component.css'],
})
export class ViewCandyComponent implements OnInit {
  public candyPreview!: CandyStorage;
  public hasBeenChanged = false;
  public subscription: Subscription = new Subscription();

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.subscription.add(
      this.adminService.seePreview().subscribe((candy) => {
        this.candyPreview = candy;
        console.log(candy);
      })
    );

    this.subscription.add(
      this.adminService.hasChanged().subscribe((hasChanged) => {
        this.hasBeenChanged = hasChanged;
        console.log(hasChanged);
      })
    );
  }

  public addCandyToStorage() {

  }
  public caca() {
    console.log(this.candyPreview);
    console.log(this.hasBeenChanged);
  }
}
