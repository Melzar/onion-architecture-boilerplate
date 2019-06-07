export abstract class BaseRouter<T> {
    protected readonly router: T;

    protected constructor(router: T) {
      this.router = router;
    }

    public abstract initialize(): void;

    public getRouter(): T {
      return this.router;
    }
}
