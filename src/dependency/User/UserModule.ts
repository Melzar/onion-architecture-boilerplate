import { interfaces } from 'inversify';

import { BaseModule } from 'dependency/BaseModule';
import { IUserService } from 'core/applicationServices/User/IUserService';
import { UserService } from 'core/applicationServices/User/UserService';
import { IUserRepository } from 'core/domainServices/User/IUserRepository';
import { IMapper } from 'core/common/mapper/IMapper';

import {
  DOMAIN_APPLICATION_SERVICE_IDENTIFIERS,
  DOMAIN_REPOSITORY_IDENTIFIERS,
} from 'core/CoreModuleSymbols';

import { UserRepository } from 'infrastructure/database/repository/UserRepository';
import { INFRASTRUCTURE_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';
import { UserEntityToUserDomainMapper } from 'infrastructure/database/mappings/User/UserEntityToUserDomainMapper';

import { UI_IDENTIFIERS } from 'ui/UiModuleSymbols';
import { UserDomainToUserUIMapper } from 'ui/common/mappings/User/UserDomainToUserUIMapper';

export class UserModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideUserRepository(bind);

    this.provideUserUIMapper(bind);
    this.provideUserEntityMapper(bind);
    this.provideUserService(bind);
  }

  private provideUserService(bind: interfaces.Bind): void {
    bind<IUserService>(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.USER_SERVICE).to(
      UserService
    );
  }

  private provideUserRepository(bind: interfaces.Bind): void {
    bind<IUserRepository>(DOMAIN_REPOSITORY_IDENTIFIERS.USER_REPOSITORY).to(
      UserRepository
    );
  }

  private provideUserEntityMapper(bind: interfaces.Bind): void {
    bind<IMapper>(INFRASTRUCTURE_IDENTIFIERS.USER_MAPPER).to(
      UserEntityToUserDomainMapper
    );
  }

  private provideUserUIMapper(bind: interfaces.Bind): void {
    bind<IMapper>(UI_IDENTIFIERS.USER_MAPPER).to(UserDomainToUserUIMapper);
  }
}
