export class AddUserUnitOfWorkRepositoryRequest {
  constructor(
    public readonly firstName: string,
    public readonly email: string,
    public readonly lastName: string,
    public readonly password: string,
    public readonly age: number
  ) {}
}
