export class AddUserRepositoryRequest {
  constructor(
    public readonly firstName: string,
    public readonly email: string,
    public readonly lastName: string,
    public readonly password: string,
    public readonly age: number,
    public readonly roleId: number
  ) {}
}
