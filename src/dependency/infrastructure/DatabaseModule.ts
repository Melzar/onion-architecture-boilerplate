import { BaseModule } from 'dependency/BaseModule';
import { interfaces } from 'inversify';
import { OnionOrm } from 'infrastructure/db/orm/OnionOrm';
import { BaseOrm } from 'infrastructure/db/orm/BaseOrm';
import { IUserRepository } from 'core/domainServices/IUserRepository';
import { DbUserRepository } from 'infrastructure/repository/DbUserRepository';
import { REPOSITORY_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { DATABASE_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';

export class DatabaseModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind) => {
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
