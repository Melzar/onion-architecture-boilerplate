import { injectable } from 'inversify';
import { Mapper } from '@wufe/mapper';

import { IMapper } from 'core/common/mapper/IMapper';
import { Role } from 'core/domain/Role/Role';
import { DOMAIN_MAPPING_IDENTIFIERS } from 'core/CoreModuleSymbols';

import { DATABASE_MAPPING_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';
import { Role as RoleEntity } from 'infrastructure/db/entities/Role';

@injectable()
export class RoleEntityToRoleDomainMapper implements IMapper {
  public configureMappings(mapper: Mapper): void {
    mapper.createMap<RoleEntity, Role>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.ROLE_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.ROLE_ENTITY,
      },
      Role
    );
  }
}
