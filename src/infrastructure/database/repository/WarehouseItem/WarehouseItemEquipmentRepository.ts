import { inject, injectable } from 'inversify';
import { EntityRepository } from 'typeorm';

import { IWarehouseItemEquipmentRepository } from 'core/domainServices/WarehouseItem/IWarehouseItemEquipmentRepository';
import { GetWarehouseItemEquipmentRepositoryRequest } from 'core/domainServices/WarehouseItem/requests/GetWarehouseItemEquipmentRepositoryRequest';
import { Equipment } from 'core/domain/Equipment/Equipment';
import { DOMAIN_MAPPING_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { BaseError } from 'core/common/errors/BaseError';
import { Repository } from 'infrastructure/database/repository/common/Repository';
import {
  DATABASE_MAPPING_IDENTIFIERS,
  INFRASTRUCTURE_IDENTIFIERS,
} from 'infrastructure/InfrastructureModuleSymbols';
import { DBMapper } from 'infrastructure/database/mappings/DBMapper';
import { Equipment as EquipmentEntity } from 'infrastructure/database/entities/Equipment';
import { InfrastructureErrors } from 'infrastructure/common/errors/InfrastructureErrors';

@injectable()
@EntityRepository(EquipmentEntity)
export class WarehouseItemEquipmentRepository
  extends Repository<EquipmentEntity>
  implements IWarehouseItemEquipmentRepository {
  constructor(
    @inject(INFRASTRUCTURE_IDENTIFIERS.DB_MAPPER)
    private readonly dbMapper: DBMapper
  ) {
    super(EquipmentEntity);
  }

  async getEquipment({
    warehouseItemID,
  }: GetWarehouseItemEquipmentRepositoryRequest): Promise<Equipment> {
    const equipment = await this.custom()
      .createQueryBuilder('Equipment')
      .innerJoin('Equipment.warehouseItem', 'WarehouseItem')
      .where('WarehouseItem.id = :warehouseItemID', { warehouseItemID })
      .getOne();

    if (!equipment) {
      throw new BaseError(
        InfrastructureErrors[InfrastructureErrors.EQUIPMENT_NOT_FOUND]
      );
    }

    return this.dbMapper.mapper.map<EquipmentEntity, Equipment>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.EQUIPMENT_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.EQUIPMENT_ENTITY,
      },
      equipment
    );
  }
}
