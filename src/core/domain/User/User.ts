export class User {
  constructor(
    public readonly id: number,
    public readonly firstName: string,
    public readonly email: string,
    public readonly role: string,
    public readonly lastName: string,
    public readonly password: string,
    public readonly age: number
  ) {}
}
