export abstract class BaseApplication<T> {
  protected readonly app: T;

  protected constructor(app: T) {
    this.app = app;
  }

  public abstract initialize(): void;

  public getApplication(): T {
    return this.app;
  }
}
