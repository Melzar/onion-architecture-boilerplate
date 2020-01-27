export class User {
  constructor(
      public readonly id: number,
      public readonly firstName: string,
      public readonly lastName: string,
      public readonly email: string,
      public readonly password: string, // TODO CONSIDER HAVING IT IN REPOSITORY
      public readonly age: number,
      public readonly role: string,
  ) {}
}
