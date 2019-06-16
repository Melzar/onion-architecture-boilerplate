export abstract class BaseService<R> {
    protected readonly repository: R;

    protected constructor(repository: R) {
      this.repository = repository;
    }
}
