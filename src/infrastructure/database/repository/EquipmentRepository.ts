import { inject, injectable } from 'inversify';
import { EntityRepository, getRepository } from 'typeorm';

import { IEquipmentRepository } from 'core/domainServices/Equipment/IEquipmentRepository';
import { FindEquipmentRequest } from 'core/domainServices/Equipment/request/FindEquipmentRequest';
import { FindEquipmentForUserRequest } from 'core/domainServices/Equipment/request/FindEquipmentForUserRequest';
import { CreateEquipmentRequest } from 'core/applicationServices/Equipment/requests/CreateEquipmentRequest';
import { Equipment } from 'core/domain/Equipment/Equipment';
import { DOMAIN_MAPPING_IDENTIFIERS } from 'core/CoreModuleSymbols';

import { Repository } from 'infrastructure/database/repository/Repository';
import { Equipment as EquipmentEntity } from 'infrastructure/database/entities/Equipment';
import { DBMapper } from 'infrastructure/database/mappings/DBMapper';
import {
  DATABASE_MAPPING_IDENTIFIERS,
  INFRASTRUCTURE_IDENTIFIERS,
} from 'infrastructure/InfrastructureModuleSymbols';
import { User } from 'infrastructure/database/entities/User';
import { BaseError } from 'core/common/errors/BaseError';
import { InfrastructureErrors } from 'infrastructure/common/errors/InfrastructureErrors';

/**
 * @description DONE IT THIS WAY BECAUSE OF THIS ISSUE https://github.com/inversify/InversifyJS/issues/771 and
 * https://github.com/inversify/InversifyJS/issues/941
 * I've tried with lazy loading and nested repositories but because of inversify issue I had to skip this approach
 * Eventually we could use LazyService Loader in inversify but then we would have
 * to switch every repository to separate module
 * It would make sense but in larger codebase to split modules by domain
 */

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
  }: CreateEquipmentRequest): Promise<Equipment> {
    /**
     * @description using method to avoid circular dependencies issues but it could be also used normally on long run
     */
    const user = await getRepository(User, this.getConnectionName()).findOne(
      userId
    );

    if (!user) {
      throw new BaseError(
        InfrastructureErrors[InfrastructureErrors.USER_NOT_FOUND]
      );
    }

    const equipment = new EquipmentEntity();
    equipment.name = name;

    const userToAssign = new User();
    userToAssign.id = user.id;

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
