export class ErrorResponse {
  constructor(
    public readonly code?: string,
    public readonly message?: string
  ) {}
}
