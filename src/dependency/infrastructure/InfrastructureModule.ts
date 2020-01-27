import { interfaces } from 'inversify';

import { BaseModule } from 'dependency/BaseModule';

import { INFRASTRUCTURE_SYMBOLS } from 'infrastructure/InfrastructureModuleSymbols';

import { IMapper } from 'infrastructure/common/mapper/IMapper';

import { UserEntityToUserDomainMapper } from 'infrastructure/db/mappings/User/UserEntityToUserDomainMapper';
import { DBMapper } from 'infrastructure/db/mappings/DBMapper';

export class InfrastructureModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideUserMapper(bind);
    this.provideDBMapper(bind);
  }

  private provideDBMapper(bind: interfaces.Bind): void {
    bind<DBMapper>(INFRASTRUCTURE_SYMBOLS.DB_MAPPER).to(DBMapper);
  }

  private provideUserMapper(bind: interfaces.Bind): void {
    bind<IMapper>(INFRASTRUCTURE_SYMBOLS.USER_MAPPER).to(UserEntityToUserDomainMapper);
  }
}
