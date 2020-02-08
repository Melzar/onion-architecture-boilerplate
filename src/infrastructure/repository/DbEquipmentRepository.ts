import { inject, injectable } from 'inversify';
import { EntityRepository, getRepository } from 'typeorm';

import { IEquipmentRepository } from 'core/domainServices/Equipment/IEquipmentRepository';
import { FindEquipmentRequest } from 'core/domainServices/Equipment/request/FindEquipmentRequest';
import { FindEquipmentForUserRequest } from 'core/domainServices/Equipment/request/FindEquipmentForUserRequest';
import { CreateEquipmentRequest } from 'core/applicationServices/Equipment/requests/CreateEquipmentRequest';
import { Equipment } from 'core/domain/Equipment/Equipment';
import { DOMAIN_MAPPING_IDENTIFIERS } from 'core/CoreModuleSymbols';

import { DbRepository } from 'infrastructure/repository/DbRepository';
import { Equipment as EquipmentEntity } from 'infrastructure/db/entities/Equipment';
import { DBMapper } from 'infrastructure/db/mappings/DBMapper';
import {
  DATABASE_MAPPING_IDENTIFIERS,
  INFRASTRUCTURE_IDENTIFIERS,
} from 'infrastructure/InfrastructureModuleSymbols';
import { User } from 'infrastructure/db/entities/User';

// FIXME: DONE IT THIS WAY BECAUSE OF THIS ISSUE https://github.com/inversify/InversifyJS/issues/771 and
// https://github.com/inversify/InversifyJS/issues/941
// I've tried with lazy loading and nested repositories but because of inversify issue I had to skip this approach
// Eventually we could use LazyService Loader in inversify but then we would have
// to swich every repository to separate module
// It would make sense but in larger codebase to split modules by domain
@injectable()
@EntityRepository(EquipmentEntity)
export class DbEquipmentRepository extends DbRepository<EquipmentEntity>
  implements IEquipmentRepository {
  constructor(
    @inject(INFRASTRUCTURE_IDENTIFIERS.DB_MAPPER)
    private readonly dbMapper: DBMapper
  ) {
    super(EquipmentEntity);
  }

  async findEquipment({
    id,
  }: FindEquipmentRequest): Promise<Equipment | undefined> {
    const equipment = await this.find(id);

    // TODO ADD ERROR HANDLING
    if (!equipment) {
      return undefined;
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

  async addEquipment({ name, userId }: CreateEquipmentRequest): Promise<void> {
    // TODO using method to avoid circular dependencies issues but it could be also used normally on long run
    const user = await getRepository(
      User,
      this.getConnectionName()
    ).findOneOrFail(userId);

    const equipment = new EquipmentEntity();
    equipment.name = name;

    const userToAssign = new User();
    userToAssign.id = user.id;

    equipment.user = userToAssign;

    await this.save(equipment);
  }
}
