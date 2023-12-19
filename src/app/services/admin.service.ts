import { Injectable } from '@angular/core';
import { CandyStorage } from '../models/CandyStorage';
import { Observable, of } from 'rxjs';
import { Candy } from '../models/Candy';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public hasBeenChanged = false;

  public candyStoragePreview!: CandyStorage;

  constructor() {
    this.candyStoragePreview = new CandyStorage(
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
  }

  public pushPreview(candyStorage: CandyStorage): Observable<boolean> {
    try {
      this.candyStoragePreview = candyStorage;
      this.hasBeenChanged = true;
    } catch {
      return of(false);
    } finally {
      console.log(this.candyStoragePreview);
      return of(true);
    }
  }

  public seePreview(): Observable<CandyStorage> {
    return of(this.candyStoragePreview);
  }

  public hasChanged(): Observable<boolean> {
    return of(this.hasBeenChanged);
  }
}
