export abstract class BaseLogger<T> {
  protected readonly logger: T;

  constructor(logger: T) {
    this.logger = logger;
  }

  public getLogger(): T {
    return this.logger;
  }
}
