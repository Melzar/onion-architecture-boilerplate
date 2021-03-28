import { interfaces } from 'inversify';

import { BaseModule } from 'dependency/BaseModule';
import { RoleRepository } from 'infrastructure/database/repository/Role/RoleRepository';
import { IRoleRepository } from 'core/domainServices/Role/IRoleRepository';
import { DOMAIN_REPOSITORY_IDENTIFIERS } from 'core/CoreModuleSymbols';

export class RoleModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  init(bind: interfaces.Bind): void {
    this.provideRoleRepository(bind);
  }

  private provideRoleRepository(bind: interfaces.Bind): void {
    bind<IRoleRepository>(DOMAIN_REPOSITORY_IDENTIFIERS.ROLE_REPOSITORY).to(
      RoleRepository
    );
  }
}
