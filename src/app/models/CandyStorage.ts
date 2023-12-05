import { Candy } from './Candy';

export class CandyStorage {
  constructor(public candy: Candy, public stock: number) {}

  public isInStock(): boolean {
    return this.stock > 0;
  }

  public changeStock(change: number) {
    this.stock += change;
  }

  public get candyName(): string {
    return this.candy.name;
  }
}
