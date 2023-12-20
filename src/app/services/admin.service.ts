import { Injectable } from '@angular/core';
import { CandyStorage } from '../models/CandyStorage';
import { Observable, Subject, of, scheduled, shareReplay } from 'rxjs';
import { Candy } from '../models/Candy';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private hasBeenChanged = new Subject<boolean>();
  public hasBeenChanged$: Observable<boolean> =
    this.hasBeenChanged.asObservable();

  private candyStoragePreview = new Subject<CandyStorage>();
  public candyStoragePreview$: Observable<CandyStorage> =
    this.candyStoragePreview.asObservable();

  constructor() {
    let previewCandy = new CandyStorage(
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
    this.candyStoragePreview.next(previewCandy);
  }

  public pushPreview(candyStorage: CandyStorage): Observable<boolean> {
    try {
      this.candyStoragePreview.next(candyStorage);
      this.hasBeenChanged.next(true);
      console.log(this.candyStoragePreview);
      return of(true);
    } catch (error) {
      console.error(error);
      return of(false);
    }
  }

  public seePreview(): Observable<CandyStorage> {
    // console.log(this.candyStoragePreview);
    return this.candyStoragePreview$;
  }

  public hasChanged(): Observable<boolean> {
    // console.log(this.hasBeenChanged);
    return this.hasBeenChanged$;
  }
}
