import { inject, injectable } from 'inversify';
import { EntityRepository } from 'typeorm';

import { Repository } from 'infrastructure/database/repository/common/Repository';
import {
  DATABASE_MAPPING_IDENTIFIERS,
  INFRASTRUCTURE_IDENTIFIERS,
} from 'infrastructure/InfrastructureModuleSymbols';
import { DBMapper } from 'infrastructure/database/mappings/DBMapper';
import { State as StateEntity } from 'infrastructure/database/entities/State';
import { InfrastructureErrors } from 'infrastructure/common/errors/InfrastructureErrors';
import { IWarehouseStateRepository } from 'core/domainServices/Warehouse/IWarehouseStateRepository';
import { GetWarehouseStateRepositoryRequest } from 'core/domainServices/Warehouse/request/GetWarehouseStateRepositoryRequest';
import { State } from 'core/domain/State/State';
import { BaseError } from 'core/common/errors/BaseError';
import { DOMAIN_MAPPING_IDENTIFIERS } from 'core/CoreModuleSymbols';

@injectable()
@EntityRepository(StateEntity)
export class WarehouseStateRepository extends Repository<StateEntity>
  implements IWarehouseStateRepository {
  constructor(
    @inject(INFRASTRUCTURE_IDENTIFIERS.DB_MAPPER)
    private readonly dbMapper: DBMapper
  ) {
    super(StateEntity);
  }

  async getState({
    warehouseId,
  }: GetWarehouseStateRepositoryRequest): Promise<State> {
    const state = await this.custom()
      .createQueryBuilder('State')
      .innerJoin('State.warehouses', 'Warehouse')
      .where('Warehouse.id = :warehouseId', { warehouseId })
      .getOne();

    if (!state)
      throw new BaseError(
        InfrastructureErrors[InfrastructureErrors.STATE_NOT_FOUND]
      );

    return this.dbMapper.mapper.map<StateEntity, State>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.STATE_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.STATE_ENTITY,
      },
      state
    );
  }
}
