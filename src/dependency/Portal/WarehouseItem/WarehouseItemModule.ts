import { interfaces } from 'inversify';

import { BaseModule } from 'dependency/BaseModule';
import {
  DOMAIN_APPLICATION_SERVICE_IDENTIFIERS,
  DOMAIN_REPOSITORY_IDENTIFIERS,
} from 'core/CoreModuleSymbols';
import { WarehouseItemRepository } from 'infrastructure/database/repository/Portal/WarehouseItem/WarehouseItemRepository';
import { IWarehouseItemRepository } from 'core/domainServices/Portal/WarehouseItem/IWarehouseItemRepository';
import { IWarehouseItemService } from 'core/applicationServices/Portal/WarehouseItem/IWarehouseItemService';
import { WarehouseItemService } from 'core/applicationServices/Portal/WarehouseItem/WarehouseItemService';
import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { UI_SCHEMA_IDENTIFIERS } from 'ui/UiModuleSymbols';
import { WarehouseItemMutation } from 'ui/Portal/WarehouseItem/graphql/WarehouseItemMutation';

export class WarehouseItemModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideWarehouseItemRepository(bind);

    this.provideWarehouseItemService(bind);

    this.provideWarehouseItemMutation(bind);
  }

  private provideWarehouseItemRepository(bind: interfaces.Bind) {
    bind<IWarehouseItemRepository>(
      DOMAIN_REPOSITORY_IDENTIFIERS.PORTAL_WAREHOUSE_ITEM_REPOSITORY
    ).to(WarehouseItemRepository);
  }

  private provideWarehouseItemService(bind: interfaces.Bind) {
    bind<IWarehouseItemService>(
      DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.PORTAL_WAREHOUSE_ITEM_SERVICE
    ).to(WarehouseItemService);
  }

  private provideWarehouseItemMutation(bind: interfaces.Bind): void {
    bind<IResolver>(UI_SCHEMA_IDENTIFIERS.PORTAL_WAREHOUSE_ITEM_MUTATIONS).to(
      WarehouseItemMutation
    );
  }
}
