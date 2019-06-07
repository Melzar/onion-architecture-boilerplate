import { Mapper } from '@wufe/mapper';

export abstract class BaseMapper {
  protected readonly mapper: Mapper;

  constructor() {
    this.mapper = new Mapper().withConfiguration(configuration => configuration
      .shouldIgnoreSourcePropertiesIfNotInDestination(true)
      .shouldAutomaticallyMapArrays(true));
  }

  public getMapper(): Mapper {
    return this.mapper;
  }
}
