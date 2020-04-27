import { inject, injectable } from 'inversify';
import { EntityRepository } from 'typeorm';

import { BaseError } from 'core/common/errors/BaseError';
import { IEquipmentRepository } from 'core/domainServices/Equipment/IEquipmentRepository';
import { FindEquipmentRequest } from 'core/domainServices/Equipment/request/FindEquipmentRequest';
import { FindEquipmentForUserRequest } from 'core/domainServices/Equipment/request/FindEquipmentForUserRequest';
import { AddEquipmentRequest } from 'core/domainServices/Equipment/request/AddEquipmentRequest';
import { Equipment } from 'core/domain/Equipment/Equipment';
import { DOMAIN_MAPPING_IDENTIFIERS } from 'core/CoreModuleSymbols';

import { Repository } from 'infrastructure/database/repository/common/Repository';
import { Equipment as EquipmentEntity } from 'infrastructure/database/entities/Equipment';
import { DBMapper } from 'infrastructure/database/mappings/DBMapper';
import {
  DATABASE_MAPPING_IDENTIFIERS,
  INFRASTRUCTURE_IDENTIFIERS,
} from 'infrastructure/InfrastructureModuleSymbols';
import { User } from 'infrastructure/database/entities/User';
import { InfrastructureErrors } from 'infrastructure/common/errors/InfrastructureErrors';

@injectable()
@EntityRepository(EquipmentEntity)
export class EquipmentRepository extends Repository<EquipmentEntity>
  implements IEquipmentRepository {
  constructor(
    @inject(INFRASTRUCTURE_IDENTIFIERS.DB_MAPPER)
    private readonly dbMapper: DBMapper
  ) {
    super(EquipmentEntity);
  }

  async findEquipment({ id }: FindEquipmentRequest): Promise<Equipment> {
    const equipment = await this.find(id);

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

  async findEquipmentForUser({
    userId,
  }: FindEquipmentForUserRequest): Promise<Equipment[]> {
    const userEquipment = await this.custom()
      .createQueryBuilder()
      .where('"Equipment"."userId" = :userId', {
        userId,
      })
      .getMany();

    return this.dbMapper.mapper.map<EquipmentEntity[], Equipment[]>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.EQUIPMENT_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.EQUIPMENT_ENTITY,
      },
      userEquipment
    );
  }

  async addEquipment({
    name,
    userId,
  }: AddEquipmentRequest): Promise<Equipment> {
    const equipment = new EquipmentEntity();
    equipment.name = name;

    const userToAssign = new User();
    userToAssign.id = +userId;

    equipment.user = userToAssign;

    const savedEquipment = await this.save(equipment);

    return this.dbMapper.mapper.map<EquipmentEntity, Equipment>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.EQUIPMENT_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.EQUIPMENT_ENTITY,
      },
      savedEquipment
    );
  }
}
