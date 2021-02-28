import { inject, injectable } from 'inversify';
import { EntityRepository } from 'typeorm';

import { WarehouseItem as WarehouseItemEntity } from 'infrastructure/database/entities/WarehouseItem';
import { Repository } from 'infrastructure/database/repository/common/Repository';
import {
  DATABASE_MAPPING_IDENTIFIERS,
  INFRASTRUCTURE_IDENTIFIERS,
} from 'infrastructure/InfrastructureModuleSymbols';
import { DBMapper } from 'infrastructure/database/mappings/DBMapper';
import { IWarehouseItemRepository } from 'core/domainServices/Portal/WarehouseItem/IWarehouseItemRepository';
import { AddWarehouseItemRepositoryRequest } from 'core/domainServices/Portal/WarehouseItem/requests/AddWarehouseItemRepositoryRequest';
import { WarehouseItem } from 'core/domain/Warehouse/WarehouseItem';
import { DOMAIN_MAPPING_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { Warehouse } from 'infrastructure/database/entities/Warehouse';
import { Equipment } from 'infrastructure/database/entities/Equipment';

@injectable()
@EntityRepository(WarehouseItemEntity)
export class WarehouseItemRepository extends Repository<WarehouseItemEntity>
  implements IWarehouseItemRepository {
  constructor(
    @inject(INFRASTRUCTURE_IDENTIFIERS.DB_MAPPER)
    private readonly dbMapper: DBMapper
  ) {
    super(WarehouseItemEntity);
  }

  async addWarehouseItem({
    equipmentID,
    warehouseID,
    name,
  }: AddWarehouseItemRepositoryRequest): Promise<WarehouseItem> {
    const equipment = new Equipment();
    equipment.id = equipmentID;
    const warehouse = new Warehouse();
    warehouse.id = warehouseID;

    const warehouseItem = new WarehouseItemEntity();
    if (name) {
      warehouseItem.name = name;
    }

    warehouseItem.warehouse = warehouse;
    warehouseItem.equipment = equipment;

    const addedWarehouseItem = await this.save(warehouseItem);

    return this.dbMapper.mapper.map<WarehouseItemEntity, WarehouseItem>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.WAREHOUSE_ITEM_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.WAREHOUSE_ITEM_ENTITY,
      },
      addedWarehouseItem
    );
  }
}
