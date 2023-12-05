export class User {
  constructor(private username: string, private password: string) {}

  public get getUsername(): string {
    return this.username;
  }

  public get getPassword(): string {
    return this.password;
  }
}
