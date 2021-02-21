import { inject, injectable } from 'inversify';
import { EntityRepository } from 'typeorm';

import { Warehouse as WarehouseEntity } from 'infrastructure/database/entities/Warehouse';
import { Repository } from 'infrastructure/database/repository/common/Repository';
import {
  DATABASE_MAPPING_IDENTIFIERS,
  INFRASTRUCTURE_IDENTIFIERS,
} from 'infrastructure/InfrastructureModuleSymbols';
import { DBMapper } from 'infrastructure/database/mappings/DBMapper';
import { IWarehouseRepository } from 'core/domainServices/Warehouse/IWarehouseRepository';
import { GetWarehouseRepositoryRequest } from 'core/domainServices/Warehouse/request/GetWarehouseRepositoryRequest';
import { Warehouse } from 'core/domain/Warehouse/Warehouse';
import { BaseError } from 'core/common/errors/BaseError';
import { InfrastructureErrors } from 'infrastructure/common/errors/InfrastructureErrors';
import { DOMAIN_MAPPING_IDENTIFIERS } from 'core/CoreModuleSymbols';

@injectable()
@EntityRepository(WarehouseEntity)
export class WarehouseRepository extends Repository<WarehouseEntity>
  implements IWarehouseRepository {
  constructor(
    @inject(INFRASTRUCTURE_IDENTIFIERS.DB_MAPPER)
    private readonly dbMapper: DBMapper
  ) {
    super(WarehouseEntity);
  }

  async getWarehouse({
    id,
  }: GetWarehouseRepositoryRequest): Promise<Warehouse> {
    const result = await this.find(id);

    if (!result) {
      throw new BaseError(
        InfrastructureErrors[InfrastructureErrors.WAREHOUSE_NOT_FOUND]
      );
    }

    return this.dbMapper.mapper.map<WarehouseEntity, Warehouse>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.WAREHOUSE_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.WAREHOUSE_ENTITY,
      },
      result
    );
  }

  async getWarehouses(): Promise<Warehouse[]> {
    const result = await this.findAll();

    return this.dbMapper.mapper.map<WarehouseEntity[], Warehouse[]>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.WAREHOUSE_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.WAREHOUSE_ENTITY,
      },
      result
    );
  }
}
