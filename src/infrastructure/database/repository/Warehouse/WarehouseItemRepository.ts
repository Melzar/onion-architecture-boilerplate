import { inject, injectable } from 'inversify';
import { EntityRepository } from 'typeorm';

import { Repository } from 'infrastructure/database/repository/common/Repository';
import {
  DATABASE_MAPPING_IDENTIFIERS,
  INFRASTRUCTURE_IDENTIFIERS,
} from 'infrastructure/InfrastructureModuleSymbols';
import { DBMapper } from 'infrastructure/database/mappings/DBMapper';
import { WarehouseItem as WarehouseItemEntity } from 'infrastructure/database/entities/WarehouseItem';
import { IWarehouseItemRepository } from 'core/domainServices/Warehouse/IWarehouseItemRepository';
import { GetWarehouseItemRepositoryRequest } from 'core/domainServices/Warehouse/request/GetWarehouseItemRepositoryRequest';
import { WarehouseItem } from 'core/domain/Warehouse/WarehouseItem';
import { BaseError } from 'core/common/errors/BaseError';
import { InfrastructureErrors } from 'infrastructure/common/errors/InfrastructureErrors';
import { DOMAIN_MAPPING_IDENTIFIERS } from 'core/CoreModuleSymbols';

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

  async getWarehouseItem({
    id,
  }: GetWarehouseItemRepositoryRequest): Promise<WarehouseItem> {
    const result = await this.find(id);

    if (!result) {
      throw new BaseError(
        InfrastructureErrors[InfrastructureErrors.WAREHOUSE_ITEM_NOT_FOUND]
      );
    }

    return this.dbMapper.mapper.map<WarehouseItemEntity, WarehouseItem>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.WAREHOUSE_ITEM_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.WAREHOUSE_ITEM_ENTITY,
      },
      result
    );
  }

  async getWarehouseItems(): Promise<WarehouseItem[]> {
    const result = await this.findAll();

    return this.dbMapper.mapper.map<WarehouseItemEntity[], WarehouseItem[]>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.WAREHOUSE_ITEM_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.WAREHOUSE_ITEM_ENTITY,
      },
      result
    );
  }
}
