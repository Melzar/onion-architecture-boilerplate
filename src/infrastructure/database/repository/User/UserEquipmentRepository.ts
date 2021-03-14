import { inject, injectable } from 'inversify';
import { EntityRepository } from 'typeorm';

import {
  DATABASE_MAPPING_IDENTIFIERS,
  INFRASTRUCTURE_IDENTIFIERS,
} from 'infrastructure/InfrastructureModuleSymbols';
import { Equipment as EquipmentEntity } from 'infrastructure/database/entities/Equipment';
import { Repository } from 'infrastructure/database/repository/common/Repository';
import { DBMapper } from 'infrastructure/database/mappings/DBMapper';
import { IUserEquipmentRepository } from 'core/domainServices/User/IUserEquipmentRepository';
import { FindUserEquipmentRepositoryRequest } from 'core/domainServices/User/request/FindUserEquipmentRepositoryRequest';
import { GetUserEquipmentRepositoryRequest } from 'core/domainServices/User/request/GetUserEquipmentRepositoryRequest';
import { BaseError } from 'core/common/errors/BaseError';
import { InfrastructureErrors } from 'infrastructure/common/errors/InfrastructureErrors';
import { Equipment } from 'core/domain/Equipment/Equipment';
import { DOMAIN_MAPPING_IDENTIFIERS } from 'core/CoreModuleSymbols';

@injectable()
@EntityRepository(EquipmentEntity)
export class UserEquipmentRepository extends Repository<EquipmentEntity>
  implements IUserEquipmentRepository {
  constructor(
    @inject(INFRASTRUCTURE_IDENTIFIERS.DB_MAPPER)
    private readonly dbMapper: DBMapper
  ) {
    super(EquipmentEntity);
  }

  async findEquipment({
    userId,
  }: FindUserEquipmentRepositoryRequest): Promise<Equipment[]> {
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

  async getEquipment({
    equipmentId,
    userId,
  }: GetUserEquipmentRepositoryRequest): Promise<Equipment> {
    const userEquipment = await this.custom()
      .createQueryBuilder()
      .where('"Equipment"."userId" = :userId', {
        userId,
      })
      .andWhere('"Equipment"."id" = :equipmentId', { equipmentId })
      .getOne();

    if (!userEquipment) {
      throw new BaseError(
        InfrastructureErrors[InfrastructureErrors.EQUIPMENT_NOT_FOUND]
      );
    }

    return this.dbMapper.mapper.map<EquipmentEntity, Equipment>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.EQUIPMENT_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.EQUIPMENT_ENTITY,
      },
      userEquipment
    );
  }
}
