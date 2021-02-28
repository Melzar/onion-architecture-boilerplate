import { interfaces } from 'inversify';

import { BaseModule } from 'dependency/BaseModule';
import { IWarehouseItemRepository } from 'core/domainServices/WarehouseItem/IWarehouseItemRepository';
import {
  DOMAIN_APPLICATION_SERVICE_IDENTIFIERS,
  DOMAIN_REPOSITORY_IDENTIFIERS,
} from 'core/CoreModuleSymbols';
import { WarehouseItemRepository } from 'infrastructure/database/repository/WarehouseItem/WarehouseItemRepository';
import { IWarehouseItemService } from 'core/applicationServices/WarehouseItem/IWarehouseItemService';
import { WarehouseItemService } from 'core/applicationServices/WarehouseItem/WarehouseItemService';
import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { UI_SCHEMA_IDENTIFIERS } from 'ui/UiModuleSymbols';
import { WarehouseItemQuery } from 'ui/Administration/WarehouseItem/graphql/WarehouseItemQuery';
import { WarehouseItemMutation } from 'ui/Administration/WarehouseItem/graphql/WarehouseItemMutation';
import { WarehouseItemSubQuery } from 'ui/Administration/WarehouseItem/graphql/WarehouseItemSubQuery';
import { WarehouseItemEquipmentRepository } from 'infrastructure/database/repository/WarehouseItem/WarehouseItemEquipmentRepository';
import { IWarehouseItemEquipmentRepository } from 'core/domainServices/WarehouseItem/IWarehouseItemEquipmentRepository';
import { WarehouseItemWarehouseRepository } from 'infrastructure/database/repository/WarehouseItem/WarehouseItemWarehouseRepository';
import { IWarehouseItemWarehouseRepository } from 'core/domainServices/WarehouseItem/IWarehouseItemWarehouseRepository';
import { IWarehouseItemEquipmentService } from 'core/applicationServices/WarehouseItem/IWarehouseItemEquipmentService';
import { WarehouseItemEquipmentService } from 'core/applicationServices/WarehouseItem/WarehouseItemEquipmentService';
import { IWarehouseItemWarehouseService } from 'core/applicationServices/WarehouseItem/IWarehouseItemWarehouseService';
import { WarehouseItemWarehouseService } from 'core/applicationServices/WarehouseItem/WarehouseItemWarehouseService';

export class WarehouseItemModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideWarehouseItemRepository(bind);
    this.provideWarehouseItemEquipmentRepository(bind);
    this.provideWarehouseItemWarehouseRepository(bind);

    this.provideWarehouseItemService(bind);
    this.provideWarehouseItemEquipmentService(bind);
    this.provideWarehouseItemWarehouseService(bind);

    this.provideWarehouseItemQuery(bind);
    this.provideWarehouseItemMutation(bind);
    this.provideWarehouseItemSubquery(bind);
  }

  private provideWarehouseItemRepository(bind: interfaces.Bind) {
    bind<IWarehouseItemRepository>(
      DOMAIN_REPOSITORY_IDENTIFIERS.WAREHOUSE_ITEM_REPOSITORY
    ).to(WarehouseItemRepository);
  }

  private provideWarehouseItemEquipmentRepository(bind: interfaces.Bind) {
    bind<IWarehouseItemEquipmentRepository>(
      DOMAIN_REPOSITORY_IDENTIFIERS.WAREHOUSE_ITEM_EQUIPMENT_REPOSITORY
    ).to(WarehouseItemEquipmentRepository);
  }

  private provideWarehouseItemWarehouseRepository(bind: interfaces.Bind) {
    bind<IWarehouseItemWarehouseRepository>(
      DOMAIN_REPOSITORY_IDENTIFIERS.WAREHOUSE_ITEM_WAREHOUSE_REPOSITORY
    ).to(WarehouseItemWarehouseRepository);
  }

  private provideWarehouseItemService(bind: interfaces.Bind) {
    bind<IWarehouseItemService>(
      DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.WAREHOUSE_ITEM_SERVICE
    ).to(WarehouseItemService);
  }

  private provideWarehouseItemEquipmentService(bind: interfaces.Bind) {
    bind<IWarehouseItemEquipmentService>(
      DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.WAREHOUSE_ITEM_EQUIPMENT_SERVICE
    ).to(WarehouseItemEquipmentService);
  }

  private provideWarehouseItemWarehouseService(bind: interfaces.Bind) {
    bind<IWarehouseItemWarehouseService>(
      DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.WAREHOUSE_ITEM_WAREHOUSE_SERVICE
    ).to(WarehouseItemWarehouseService);
  }

  private provideWarehouseItemQuery(bind: interfaces.Bind) {
    bind<IResolver>(
      UI_SCHEMA_IDENTIFIERS.ADMINISTRATION_WAREHOUSE_ITEM_QUERIES
    ).to(WarehouseItemQuery);
  }

  private provideWarehouseItemMutation(bind: interfaces.Bind) {
    bind<IResolver>(
      UI_SCHEMA_IDENTIFIERS.ADMINISTRATION_WAREHOUSE_ITEM_MUTATIONS
    ).to(WarehouseItemMutation);
  }

  private provideWarehouseItemSubquery(bind: interfaces.Bind) {
    bind<IResolver>(
      UI_SCHEMA_IDENTIFIERS.ADMINISTRATION_WAREHOUSE_ITEM_SUBQUERIES
    ).to(WarehouseItemSubQuery);
  }
}
