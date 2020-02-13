import { interfaces } from 'inversify';

import { BaseModule } from 'dependency/BaseModule';
import { DBMapper } from 'infrastructure/database/mappings/DBMapper';

import {
  DATABASE_IDENTIFIERS,
  INFRASTRUCTURE_IDENTIFIERS,
} from 'infrastructure/InfrastructureModuleSymbols';
import { IOrm } from 'infrastructure/database/orm/IOrm';
import { OnionOrm } from 'infrastructure/database/orm/OnionOrm';

import { UIMapper } from 'ui/common/mappings/UIMapper';
import { UI_IDENTIFIERS } from 'ui/UiModuleSymbols';

export class CommonModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideOrm(bind);

    this.provideDBMapper(bind);
    this.provideUIMapper(bind);
  }

  private provideUIMapper(bind: interfaces.Bind): void {
    bind<UIMapper>(UI_IDENTIFIERS.UI_MAPPER).to(UIMapper);
  }

  private provideDBMapper(bind: interfaces.Bind): void {
    bind<DBMapper>(INFRASTRUCTURE_IDENTIFIERS.DB_MAPPER).to(DBMapper);
  }

  private provideOrm(bind: interfaces.Bind): void {
    bind<IOrm>(DATABASE_IDENTIFIERS.ORM).to(OnionOrm);
  }
}
