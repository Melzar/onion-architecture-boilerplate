import { Mapper } from '@wufe/mapper';

export abstract class BaseMapper {
    protected readonly mapper: Mapper;

    constructor(mapper: Mapper) {
      this.mapper = mapper;
    }

    public abstract initialize(): void;

    public getMapper(): Mapper {
      return this.mapper;
    }
}
