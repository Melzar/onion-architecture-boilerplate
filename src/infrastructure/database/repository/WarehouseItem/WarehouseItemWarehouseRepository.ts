import { inject, injectable } from 'inversify';
import { EntityRepository } from 'typeorm';

import { Repository } from 'infrastructure/database/repository/common/Repository';
import {
  DATABASE_MAPPING_IDENTIFIERS,
  INFRASTRUCTURE_IDENTIFIERS,
} from 'infrastructure/InfrastructureModuleSymbols';
import { DBMapper } from 'infrastructure/database/mappings/DBMapper';
import { InfrastructureErrors } from 'infrastructure/common/errors/InfrastructureErrors';
import { Warehouse as WarehouseEntity } from 'infrastructure/database/entities/Warehouse';
import { IWarehouseItemWarehouseRepository } from 'core/domainServices/WarehouseItem/IWarehouseItemWarehouseRepository';
import { GetWarehouseItemWarehouseRepositoryRequest } from 'core/domainServices/WarehouseItem/requests/GetWarehouseItemWarehouseRepositoryRequest';
import { Warehouse } from 'core/domain/Warehouse/Warehouse';
import { BaseError } from 'core/common/errors/BaseError';
import { DOMAIN_MAPPING_IDENTIFIERS } from 'core/CoreModuleSymbols';

@injectable()
@EntityRepository(WarehouseEntity)
export class WarehouseItemWarehouseRepository
  extends Repository<WarehouseEntity>
  implements IWarehouseItemWarehouseRepository {
  constructor(
    @inject(INFRASTRUCTURE_IDENTIFIERS.DB_MAPPER)
    private readonly dbMapper: DBMapper
  ) {
    super(WarehouseEntity);
  }

  async getWarehouse({
    warehouseItemId,
  }: GetWarehouseItemWarehouseRepositoryRequest): Promise<Warehouse> {
    const warehouse = await this.custom()
      .createQueryBuilder('Warehouse')
      .innerJoin('Warehouse.warehouseItems', 'WarehouseItem')
      .where('WarehouseItem.id = :warehouseItemId', { warehouseItemId })
      .getOne();

    if (!warehouse) {
      throw new BaseError(
        InfrastructureErrors[InfrastructureErrors.WAREHOUSE_NOT_FOUND]
      );
    }

    return this.dbMapper.mapper.map<WarehouseEntity, Warehouse>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.WAREHOUSE_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.WAREHOUSE_ENTITY,
      },
      warehouse
    );
  }
}
