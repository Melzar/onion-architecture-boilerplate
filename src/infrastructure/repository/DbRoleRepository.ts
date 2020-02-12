import { inject, injectable } from 'inversify';

import { EntityRepository } from 'typeorm';

import { IRoleRepository } from 'core/domainServices/Role/IRoleRepository';
import { FindRoleRequest } from 'core/domainServices/Role/request/FindRoleRequest';
import { Role } from 'core/domain/Role/Role';
import { DOMAIN_MAPPING_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { FindRoleByNameRequest } from 'core/domainServices/Role/request/FindRoleByNameRequest';
import { BaseError } from 'core/common/errors/BaseError';

import { Role as RoleEntity } from 'infrastructure/db/entities/Role';
import { DBMapper } from 'infrastructure/db/mappings/DBMapper';
import {
  DATABASE_MAPPING_IDENTIFIERS,
  INFRASTRUCTURE_IDENTIFIERS,
} from 'infrastructure/InfrastructureModuleSymbols';
import { DbRepository } from 'infrastructure/repository/DbRepository';
import { InfrastructureErrors } from 'infrastructure/common/errors/InfrastructureErrors';

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

  async findRole({ id }: FindRoleRequest): Promise<Role> {
    const role = await this.find(id);

    if (!role) {
      throw new BaseError(InfrastructureErrors.ROLE_NOT_FOUND.toString());
    }

    return this.dbMapper.mapper.map<RoleEntity, Role>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.ROLE_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.ROLE_ENTITY,
      },
      role
    );
  }

  async findRoleByName({ name }: FindRoleByNameRequest): Promise<Role> {
    const role = await this.custom()
      .createQueryBuilder()
      .where('"Role"."name" = :name', {
        name,
      })
      .getOne();

    if (!role) {
      throw new BaseError(InfrastructureErrors.ROLE_NOT_FOUND.toString());
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
