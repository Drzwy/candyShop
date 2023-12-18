export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

export class User {
  constructor(
    private username: string,
    private password: string,
    private type: UserRole
  ) {}

  public get getUsername(): string {
    return this.username;
  }

  public get getPassword(): string {
    return this.password;
  }

  public get getType(): string {
    return this.type;
  }
}
