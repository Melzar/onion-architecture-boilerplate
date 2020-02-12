export class BaseError implements Error {
  constructor(
    public readonly code?: string,
    public readonly message: string = '',
    public readonly name: string = ''
  ) {}
}
