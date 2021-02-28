import { interfaces } from 'inversify';

import { IWarehouseRepository } from 'core/domainServices/Portal/Warehouse/IWarehouseRepository';
import { IWarehouseService } from 'core/applicationServices/Portal/Warehouse/IWarehouseService';
import { WarehouseService } from 'core/applicationServices/Portal/Warehouse/WarehouseService';
import { BaseModule } from 'dependency/BaseModule';
import {
  DOMAIN_APPLICATION_SERVICE_IDENTIFIERS,
  DOMAIN_REPOSITORY_IDENTIFIERS,
} from 'core/CoreModuleSymbols';
import { WarehouseRepository } from 'infrastructure/database/repository/Portal/Warehouse/WarehouseRepository';
import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { UI_SCHEMA_IDENTIFIERS } from 'ui/UiModuleSymbols';
import { WarehouseQuery } from 'ui/Portal/Warehouse/WarehouseQuery';

export class WarehouseModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideWarehouseRepository(bind);

    this.provideWarehouseService(bind);

    this.provideWarehouseQuery(bind);
  }

  private provideWarehouseRepository(bind: interfaces.Bind): void {
    bind<IWarehouseRepository>(
      DOMAIN_REPOSITORY_IDENTIFIERS.PORTAL_WAREHOUSE_REPOSITORY
    ).to(WarehouseRepository);
  }

  private provideWarehouseService(bind: interfaces.Bind): void {
    bind<IWarehouseService>(
      DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.PORTAL_WAREHOUSE_SERVICE
    ).to(WarehouseService);
  }

  private provideWarehouseQuery(bind: interfaces.Bind): void {
    bind<IResolver>(UI_SCHEMA_IDENTIFIERS.PORTAL_WAREHOUSE_QUERIES).to(
      WarehouseQuery
    );
  }
}
