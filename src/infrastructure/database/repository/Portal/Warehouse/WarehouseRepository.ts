import { inject, injectable } from 'inversify';
import { EntityRepository } from 'typeorm';

import { Warehouse as WarehouseEntity } from 'infrastructure/database/entities/Warehouse';
import { Repository } from 'infrastructure/database/repository/common/Repository';
import {
  DATABASE_MAPPING_IDENTIFIERS,
  INFRASTRUCTURE_IDENTIFIERS,
} from 'infrastructure/InfrastructureModuleSymbols';
import { DBMapper } from 'infrastructure/database/mappings/DBMapper';
import { IWarehouseRepository } from 'core/domainServices/Portal/Warehouse/IWarehouseRepository';
import { Warehouse } from 'core/domain/Warehouse/Warehouse';
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

  async getAvailableWarehouses(): Promise<Warehouse[]> {
    const warehouses = await this.findAll(); // TODO add query statement to fetch only warehouses which capacity is below 100%

    return this.dbMapper.mapper.map<WarehouseEntity[], Warehouse[]>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.WAREHOUSE_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.WAREHOUSE_ENTITY,
      },
      warehouses
    );
  }
}
