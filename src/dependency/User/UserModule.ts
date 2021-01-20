import { interfaces } from 'inversify';

import { BaseModule } from 'dependency/BaseModule';
import { IUserService } from 'core/applicationServices/User/IUserService';
import { UserService } from 'core/applicationServices/User/UserService';
import { IUserRepository } from 'core/domainServices/User/IUserRepository';
import { IMapper } from 'core/common/mapper/IMapper';

import {
  DOMAIN_APPLICATION_SERVICE_IDENTIFIERS,
  DOMAIN_REPOSITORY_IDENTIFIERS,
  DOMAIN_UNIT_OF_WORK_IDENTIFIERS,
} from 'core/CoreModuleSymbols';

import { UserRepository } from 'infrastructure/database/repository/User/UserRepository';
import { INFRASTRUCTURE_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';
import { UserEntityToUserDomainMapper } from 'infrastructure/database/mappings/User/UserEntityToUserDomainMapper';

import { UI_IDENTIFIERS, UI_SCHEMA_IDENTIFIERS } from 'ui/UiModuleSymbols';
import { UserDomainToUserUIMapper } from 'ui/common/mappings/User/UserDomainToUserUIMapper';
import { IUserUnitOfWork } from 'core/domainServices/User/IUserUnitOfWork';
import { UserUnitOfWork } from 'infrastructure/database/repository/User/UserUnitOfWork';
import { UserQuery } from 'ui/User/graphql/UserQuery';
import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { UserMutation } from 'ui/User/graphql/UserMutation';
import { UserSubquery } from 'ui/User/graphql/UserSubquery';

export class UserModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideUserRepository(bind);
    this.provideUserUnitOfWork(bind);

    this.provideUserUIMapper(bind);
    this.provideUserEntityMapper(bind);
    this.provideUserService(bind);

    this.provideUserQuery(bind);
    this.provideUserMutation(bind);
    this.provideUserSubquery(bind);
  }

  private provideUserRepository(bind: interfaces.Bind): void {
    bind<IUserRepository>(DOMAIN_REPOSITORY_IDENTIFIERS.USER_REPOSITORY).to(
      UserRepository
    );
  }

  private provideUserUnitOfWork(bind: interfaces.Bind): void {
    bind<IUserUnitOfWork>(DOMAIN_UNIT_OF_WORK_IDENTIFIERS.USER_UNIT_OF_WORK).to(
      UserUnitOfWork
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

  private provideUserService(bind: interfaces.Bind): void {
    bind<IUserService>(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.USER_SERVICE).to(
      UserService
    );
  }

  private provideUserQuery(bind: interfaces.Bind): void {
    bind<IResolver>(UI_SCHEMA_IDENTIFIERS.USER_QUERIES).to(UserQuery);
  }

  private provideUserMutation(bind: interfaces.Bind): void {
    bind<IResolver>(UI_SCHEMA_IDENTIFIERS.USER_MUTATIONS).to(UserMutation);
  }

  private provideUserSubquery(bind: interfaces.Bind): void {
    bind<IResolver>(UI_SCHEMA_IDENTIFIERS.USER_SUBQUERIES).to(UserSubquery);
  }
}
