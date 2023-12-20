import { Injectable } from '@angular/core';
import { CandyStorage } from '../models/CandyStorage';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Candy } from '../models/Candy';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public hasBeenChanged = false;

  public candyStoragePreview: CandyStorage;
  public candyStoragePreview$: BehaviorSubject<CandyStorage>;

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
    this.candyStoragePreview$ = new BehaviorSubject(this.candyStoragePreview);
  }

  public pushPreview(
    name: string,
    desc: string,
    flavour: string,
    colour: string,
    price: number,
    photoLink: string,
    stock: number
  ): Observable<boolean> {
    try {
      let candy = new CandyStorage(
        new Candy(name, desc, flavour, colour, price, photoLink),
        stock
      );
      this.candyStoragePreview = candy;
      this.hasBeenChanged = true;
      console.log(this.candyStoragePreview);
      return of(true);
    } catch (error) {
      console.error(error);
      return of(false);
    }
  }

  public seePreview(): Observable<CandyStorage> {
    return this.candyStoragePreview$.asObservable();
  }

  public hasChanged(): Observable<boolean> {
    return of(this.hasBeenChanged);
  }
}
