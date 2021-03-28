import { injectable } from 'inversify';
import { Mapper } from '@wufe/mapper';

import { UserDomainToUserUI } from 'ui/common/mappings/User/UserDomainToUserUI';

@injectable()
export class UIMapper {
  public readonly mapper: Mapper;

  constructor() {
    this.mapper = new Mapper().withConfiguration(configuration =>
      configuration
        .shouldIgnoreSourcePropertiesIfNotInDestination(true)
        .shouldAutomaticallyMapArrays(true)
    );

    this.initialize();
  }

  private initialize(): void {
    UserDomainToUserUI().configureMapping(this.mapper);
  }
}
