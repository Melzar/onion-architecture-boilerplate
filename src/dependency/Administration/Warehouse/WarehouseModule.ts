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
import { IWarehouseService } from 'core/applicationServices/Warehouse/IWarehouseService';
import { WarehouseService } from 'core/applicationServices/Warehouse/WarehouseService';
import { IWarehouseWarehouseItemRepository } from 'core/domainServices/Warehouse/IWarehouseWarehouseItemRepository';
import { WarehouseWarehouseItemService } from 'core/applicationServices/Warehouse/WarehouseWarehouseItemService';
import { IWarehouseWarehouseItemService } from 'core/applicationServices/Warehouse/IWarehouseWarehouseItemService';
import { IWarehouseStateRepository } from 'core/domainServices/Warehouse/IWarehouseStateRepository';
import { WarehouseStateService } from 'core/applicationServices/Warehouse/WarehouseStateService';
import { IWarehouseStateService } from 'core/applicationServices/Warehouse/IWarehouseStateService';
import { WarehouseRepository } from 'infrastructure/database/repository/Warehouse/WarehouseRepository';
import { WarehouseWarehouseItemRepository } from 'infrastructure/database/repository/Warehouse/WarehouseWarehouseItemRepository';
import { WarehouseStateRepository } from 'infrastructure/database/repository/Warehouse/WarehouseStateRepository';

export class WarehouseModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideWarehouseRepository(bind);
    this.provideWarehouseWarehouseItemRepository(bind);
    this.provideWarehouseStateRepository(bind);

    this.provideWarehouseService(bind);
    this.provideWarehouseWarehouseItemService(bind);
    this.provideWarehouseStateService(bind);

    this.provideWarehouseQuery(bind);
    this.provideWarehouseMutation(bind);
    this.provideWarehouseSubQuery(bind);
  }

  private provideWarehouseRepository(bind: interfaces.Bind): void {
    bind<IWarehouseRepository>(
      DOMAIN_REPOSITORY_IDENTIFIERS.WAREHOUSE_REPOSITORY
    ).to(WarehouseRepository);
  }

  private provideWarehouseWarehouseItemRepository(bind: interfaces.Bind): void {
    bind<IWarehouseWarehouseItemRepository>(
      DOMAIN_REPOSITORY_IDENTIFIERS.WAREHOUSE_WAREHOUSE_ITEM_REPOSITORY
    ).to(WarehouseWarehouseItemRepository);
  }

  private provideWarehouseStateRepository(bind: interfaces.Bind): void {
    bind<IWarehouseStateRepository>(
      DOMAIN_REPOSITORY_IDENTIFIERS.WAREHOUSE_STATE_REPOSITORY
    ).to(WarehouseStateRepository);
  }

  private provideWarehouseService(bind: interfaces.Bind): void {
    bind<IWarehouseService>(
      DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.WAREHOUSE_SERVICE
    ).to(WarehouseService);
  }

  private provideWarehouseWarehouseItemService(bind: interfaces.Bind): void {
    bind<IWarehouseWarehouseItemService>(
      DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.WAREHOUSE_WAREHOUSE_ITEM_SERVICE
    ).to(WarehouseWarehouseItemService);
  }

  private provideWarehouseStateService(bind: interfaces.Bind): void {
    bind<IWarehouseStateService>(
      DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.WAREHOUSE_STATE_SERVICE
    ).to(WarehouseStateService);
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
