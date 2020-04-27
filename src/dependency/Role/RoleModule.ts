import { interfaces } from 'inversify';

import { BaseModule } from 'dependency/BaseModule';

import { INFRASTRUCTURE_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';
import { RoleEntityToRoleDomainMapper } from 'infrastructure/database/mappings/Role/RoleEntityToRoleDomainMapper';
import { RoleRepository } from 'infrastructure/database/repository/Role/RoleRepository';

import { IMapper } from 'core/common/mapper/IMapper';
import { IRoleRepository } from 'core/domainServices/Role/IRoleRepository';
import { DOMAIN_REPOSITORY_IDENTIFIERS } from 'core/CoreModuleSymbols';

export class RoleModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  init(bind: interfaces.Bind): void {
    this.provideRoleMapper(bind);

    this.provideRoleRepository(bind);
  }

  private provideRoleMapper(bind: interfaces.Bind): void {
    bind<IMapper>(INFRASTRUCTURE_IDENTIFIERS.ROLE_MAPPER).to(
      RoleEntityToRoleDomainMapper
    );
  }

  private provideRoleRepository(bind: interfaces.Bind): void {
    bind<IRoleRepository>(DOMAIN_REPOSITORY_IDENTIFIERS.ROLE_REPOSITORY).to(
      RoleRepository
    );
  }
}
