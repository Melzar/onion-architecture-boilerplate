import { interfaces } from 'inversify';

import { BaseModule } from 'dependency/BaseModule';
import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { UI_SCHEMA_IDENTIFIERS } from 'ui/UiModuleSymbols';
import { WarehouseQuery } from 'ui/Administration/Warehouse/graphql/WarehouseQuery';
import { WarehouseMutation } from 'ui/Administration/Warehouse/graphql/WarehouseMutation';
import { WarehouseSubQuery } from 'ui/Administration/Warehouse/graphql/WarehouseSubQuery';
import { IWarehouseRepository } from 'core/domainServices/Warehouse/IWarehouseRepository';
import {
  DOMAIN_APPLICATION_SERVICE_IDENTIFIERS,
  DOMAIN_REPOSITORY_IDENTIFIERS,
} from 'core/CoreModuleSymbols';
import { IWarehouseItemRepository } from 'core/domainServices/Warehouse/IWarehouseItemRepository';
import { IWarehouseService } from 'core/applicationServices/Warehouse/IWarehouseService';
import { WarehouseService } from 'core/applicationServices/Warehouse/WarehouseService';
import { IWarehouseItemService } from 'core/applicationServices/Warehouse/IWarehouseItemService';
import { WarehouseItemService } from 'core/applicationServices/Warehouse/WarehouseItemService';
import { WarehouseRepository } from 'infrastructure/database/repository/Warehouse/WarehouseRepository';
import { WarehouseItemRepository } from 'infrastructure/database/repository/Warehouse/WarehouseItemRepository';

export class WarehouseModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideWarehouseRepository(bind);
    this.provideWarehouseItemRepository(bind);

    this.provideWarehouseService(bind);
    this.provideWarehouseItemService(bind);

    this.provideWarehouseQuery(bind);
    this.provideWarehouseMutation(bind);
    this.provideWarehouseSubQuery(bind);
  }

  private provideWarehouseRepository(bind: interfaces.Bind): void {
    bind<IWarehouseRepository>(
      DOMAIN_REPOSITORY_IDENTIFIERS.WAREHOUSE_REPOSITORY
    ).to(WarehouseRepository);
  }

  private provideWarehouseItemRepository(bind: interfaces.Bind): void {
    bind<IWarehouseItemRepository>(
      DOMAIN_REPOSITORY_IDENTIFIERS.WAREHOUSE_ITEM_REPOSITORY
    ).to(WarehouseItemRepository);
  }

  private provideWarehouseService(bind: interfaces.Bind): void {
    bind<IWarehouseService>(
      DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.WAREHOUSE_SERVICE
    ).to(WarehouseService);
  }

  private provideWarehouseItemService(bind: interfaces.Bind): void {
    bind<IWarehouseItemService>(
      DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.WAREHOUSE_ITEM_SERVICE
    ).to(WarehouseItemService);
  }

  private provideWarehouseQuery(bind: interfaces.Bind): void {
    bind<IResolver>(UI_SCHEMA_IDENTIFIERS.ADMINISTRATION_WAREHOUSE_QUERIES).to(
      WarehouseQuery
    );
  }

  private provideWarehouseMutation(bind: interfaces.Bind): void {
    bind<IResolver>(
      UI_SCHEMA_IDENTIFIERS.ADMINISTRATION_WAREHOUSE_MUTATIONS
    ).to(WarehouseMutation);
  }

  private provideWarehouseSubQuery(bind: interfaces.Bind): void {
    bind<IResolver>(
      UI_SCHEMA_IDENTIFIERS.ADMINISTRATION_WAREHOUSE_SUBQUERIES
    ).to(WarehouseSubQuery);
  }
}
