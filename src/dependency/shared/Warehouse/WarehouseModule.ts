import { interfaces } from 'inversify';

import { BaseModule } from 'dependency/BaseModule';
import { IMapper } from 'core/common/mapper/IMapper';
import { INFRASTRUCTURE_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';
import { WarehouseEntityToWarehouseDomainMapper } from 'infrastructure/database/mappings/Warehouse/WarehouseEntityToWarehouseDomainMapper';
import { WarehouseItemEntityToWarehouseItemDomainMapper } from 'infrastructure/database/mappings/Warehouse/WarehouseItemEntityToWarehouseItemDomainMapper';

export class WarehouseModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideWarehouseEntityMapper(bind);
    this.provideWarehouseItemEntityMapper(bind);
  }

  private provideWarehouseEntityMapper(bind: interfaces.Bind): void {
    bind<IMapper>(INFRASTRUCTURE_IDENTIFIERS.WAREHOUSE_MAPPER).to(
      WarehouseEntityToWarehouseDomainMapper
    );
  }

  private provideWarehouseItemEntityMapper(bind: interfaces.Bind): void {
    bind<IMapper>(INFRASTRUCTURE_IDENTIFIERS.WAREHOUSE_ITEM_MAPPER).to(
      WarehouseItemEntityToWarehouseItemDomainMapper
    );
  }
}
