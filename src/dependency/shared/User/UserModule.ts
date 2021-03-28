import { interfaces } from 'inversify';

import { BaseModule } from 'dependency/BaseModule';
import { IUserService } from 'core/applicationServices/User/IUserService';
import { UserService } from 'core/applicationServices/User/UserService';
import { IUserRepository } from 'core/domainServices/User/IUserRepository';

import {
  DOMAIN_APPLICATION_SERVICE_IDENTIFIERS,
  DOMAIN_REPOSITORY_IDENTIFIERS,
  DOMAIN_UNIT_OF_WORK_IDENTIFIERS,
} from 'core/CoreModuleSymbols';

import { UserRepository } from 'infrastructure/database/repository/User/UserRepository';
import { UserUnitOfWork } from 'infrastructure/database/repository/User/UserUnitOfWork';
import { IUserUnitOfWork } from 'core/domainServices/User/IUserUnitOfWork';

export class UserModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideUserRepository(bind);
    this.provideUserUnitOfWork(bind);

    this.provideUserService(bind);
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

  private provideUserService(bind: interfaces.Bind): void {
    bind<IUserService>(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.USER_SERVICE).to(
      UserService
    );
  }
}
