export class Candy {
  private static counter: number = 0;
  private id: number;

  constructor(
    public name: string,
    public description: string,
    public flavour: string,
    public colour: string,
    public price: number,
    public photoLink: string
  ) {
    Candy.counter += 1;
    this.id = Candy.counter;
  }
}
