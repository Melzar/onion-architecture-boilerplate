import { inject, injectable } from 'inversify';
import { EntityRepository } from 'typeorm';

import { WarehouseItem as WarehouseItemEntity } from 'infrastructure/database/entities/WarehouseItem';
import { Repository } from 'infrastructure/database/repository/common/Repository';
import {
  DATABASE_MAPPING_IDENTIFIERS,
  INFRASTRUCTURE_IDENTIFIERS,
} from 'infrastructure/InfrastructureModuleSymbols';
import { DBMapper } from 'infrastructure/database/mappings/DBMapper';
import { IWarehouseWarehouseItemRepository } from 'core/domainServices/Warehouse/IWarehouseWarehouseItemRepository';
import { GetWarehouseItemsRepositoryRequest } from 'core/domainServices/WarehouseItem/requests/GetWarehouseItemsRepositoryRequest';
import { WarehouseItem } from 'core/domain/Warehouse/WarehouseItem';
import { DOMAIN_MAPPING_IDENTIFIERS } from 'core/CoreModuleSymbols';

@injectable()
@EntityRepository(WarehouseItemEntity)
export class WarehouseWarehouseItemRepository
  extends Repository<WarehouseItemEntity>
  implements IWarehouseWarehouseItemRepository {
  constructor(
    @inject(INFRASTRUCTURE_IDENTIFIERS.DB_MAPPER)
    private readonly dbMapper: DBMapper
  ) {
    super(WarehouseItemEntity);
  }

  async getWarehouseItems({
    warehouseId,
  }: GetWarehouseItemsRepositoryRequest): Promise<WarehouseItem[]> {
    const warehouseItems = await this.findBy({
      warehouse: { id: warehouseId },
    });

    return this.dbMapper.mapper.map<WarehouseItemEntity[], WarehouseItem[]>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.WAREHOUSE_ITEM_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.WAREHOUSE_ITEM_ENTITY,
      },
      warehouseItems
    );
  }
}
