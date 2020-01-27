import { interfaces } from 'inversify';

import { BaseModule } from 'dependency/BaseModule';

import { OnionOrm } from 'infrastructure/db/orm/OnionOrm';
import { BaseOrm } from 'infrastructure/db/orm/BaseOrm';

import { DbUserRepository } from 'infrastructure/repository/DbUserRepository';
import { DATABASE_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';

import { IUserRepository } from 'core/domainServices/IUserRepository';
import { REPOSITORY_IDENTIFIERS } from 'core/CoreModuleSymbols';

export class DatabaseModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideOrm(bind);

    this.provideDbUserRepository(bind);
  }

  private provideOrm(bind: interfaces.Bind): void {
    bind<BaseOrm>(DATABASE_IDENTIFIERS.ORM).to(OnionOrm);
  }

  private provideDbUserRepository(bind: interfaces.Bind): void {
    bind<IUserRepository>(REPOSITORY_IDENTIFIERS.USER_REPOSITORY).to(DbUserRepository);
  }
}
