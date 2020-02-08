export class AuthenticationRequest {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}
}
