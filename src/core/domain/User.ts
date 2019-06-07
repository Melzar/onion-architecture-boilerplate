export class User {
    private readonly _id: number;

    private readonly _firstName: string;

    private readonly _lastName: string;

    private readonly _email: string;

    private readonly _password: string;

    private readonly _age: number;

    constructor(
      id: number,
      firstName: string,
      lastName: string,
      email: string,
      password: string,
      age: number,
    ) {
      this._id = id;
      this._firstName = firstName;
      this._lastName = lastName;
      this._email = email;
      this._password = password;
      this._age = age;
    }

    get id(): number {
      return this._id;
    }

    get firstName(): string {
      return this._firstName;
    }

    get lastName(): string {
      return this._lastName;
    }

    get email(): string {
      return this._email;
    }

    get password(): string {
      return this._password;
    }

    get age(): number {
      return this._age;
    }
}
