import { inject, injectable } from 'inversify';

import { EntityRepository } from 'typeorm';

import { IRoleRepository } from 'core/domainServices/Role/IRoleRepository';
import { FindRoleRequest } from 'core/domainServices/Role/request/FindRoleRequest';
import { Role } from 'core/domain/Role/Role';
import { DOMAIN_MAPPING_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { FindRoleByNameRequest } from 'core/domainServices/Role/request/FindRoleByNameRequest';

import { Role as RoleEntity } from 'infrastructure/db/entities/Role';
import { DBMapper } from 'infrastructure/db/mappings/DBMapper';
import {
  DATABASE_MAPPING_IDENTIFIERS,
  INFRASTRUCTURE_IDENTIFIERS,
} from 'infrastructure/InfrastructureModuleSymbols';
import { DbRepository } from 'infrastructure/repository/DbRepository';

@injectable()
@EntityRepository(RoleEntity)
export class DbRoleRepository extends DbRepository<RoleEntity>
  implements IRoleRepository {
  constructor(
    @inject(INFRASTRUCTURE_IDENTIFIERS.DB_MAPPER)
    private readonly dbMapper: DBMapper
  ) {
    super(RoleEntity);
  }

  async findRole({ id }: FindRoleRequest): Promise<Role | undefined> {
    const role = await this.find(id);

    // TODO ADD ERROR HANDLING
    if (!role) {
      return undefined;
    }

    return this.dbMapper.mapper.map<RoleEntity, Role>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.ROLE_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.ROLE_ENTITY,
      },
      role
    );
  }

  async findRoleByName({
    name,
  }: FindRoleByNameRequest): Promise<Role | undefined> {
    const role = await this.custom()
      .createQueryBuilder()
      .where('"Role"."name" = :name', {
        name,
      })
      .getOne();

    // TODO ADD ERROR HANDLING
    if (!role) {
      return undefined;
    }

    return this.dbMapper.mapper.map<RoleEntity, Role>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.ROLE_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.ROLE_ENTITY,
      },
      role
    );
  }
}
