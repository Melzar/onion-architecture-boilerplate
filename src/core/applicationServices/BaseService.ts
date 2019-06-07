export abstract class BaseService<R> {
    protected readonly repository: R;

    constructor(repository: R) {
      this.repository = repository;
    }
}
