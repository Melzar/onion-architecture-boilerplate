import { Mapper } from '@wufe/mapper';

import { IMapping } from 'core/common/mapper/IMapping';
import { Role } from 'core/domain/Role/Role';
import { DOMAIN_MAPPING_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { DATABASE_MAPPING_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';
import { Role as RoleEntity } from 'infrastructure/database/entities/Role';

export const RoleEntityToRoleDomain = (): IMapping => ({
  configureMapping(mapper: Mapper): void {
    mapper.createMap<RoleEntity, Role>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.ROLE_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.ROLE_ENTITY,
      },
      Role
    );
  },
});
