import { Mapper } from '@wufe/mapper';
import { inject, injectable } from 'inversify';

import { UserEntityToUserDomainMapper } from 'infrastructure/db/mappings/User/UserEntityToUserDomainMapper';
import { INFRASTRUCTURE_SYMBOLS } from 'infrastructure/InfrastructureModuleSymbols';

@injectable()
export class DBMapper {
  public readonly mapper: Mapper;

  constructor(@inject(INFRASTRUCTURE_SYMBOLS.USER_MAPPER)
              private readonly userEntityToUserDomainMapper: UserEntityToUserDomainMapper) {
    this.mapper = new Mapper().withConfiguration((configuration) => configuration
      .shouldIgnoreSourcePropertiesIfNotInDestination(true)
      .shouldAutomaticallyMapArrays(true));

    this.initialize();
  }

  private initialize(): void {
    this.userEntityToUserDomainMapper.configureMappings(this.mapper);
  }
}
