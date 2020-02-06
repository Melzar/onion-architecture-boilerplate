import { interfaces } from 'inversify';

import { BaseModule } from 'dependency/BaseModule';

import { OnionOrm } from 'infrastructure/db/orm/OnionOrm';
import { IOrm } from 'infrastructure/db/orm/IOrm';

import { DbUserRepository } from 'infrastructure/repository/DbUserRepository';
import { DbRoleRepository } from 'infrastructure/repository/DbRoleRepository';
import { DbEquipmentRepository } from 'infrastructure/repository/DbEquipmentRepository';
import { DATABASE_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';

import { IUserRepository } from 'core/domainServices/User/IUserRepository';
import { DOMAIN_REPOSITORY_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { IEquipmentRepository } from 'core/domainServices/Equipment/IEquipmentRepository';
import { IRoleRepository } from 'core/domainServices/Role/IRoleRepository';

export class DatabaseModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideOrm(bind);

    this.provideDbEquipmentRepository(bind);
    this.provideDbRoleRepository(bind);
    this.provideDbUserRepository(bind);
  }

  private provideOrm(bind: interfaces.Bind): void {
    bind<IOrm>(DATABASE_IDENTIFIERS.ORM).to(OnionOrm);
  }

  private provideDbUserRepository(bind: interfaces.Bind): void {
    bind<IUserRepository>(DOMAIN_REPOSITORY_IDENTIFIERS.USER_REPOSITORY).to(
      DbUserRepository
    );
  }

  private provideDbEquipmentRepository(bind: interfaces.Bind): void {
    bind<IEquipmentRepository>(
      DOMAIN_REPOSITORY_IDENTIFIERS.EQUIPMENT_REPOSITORY
    ).to(DbEquipmentRepository);
  }

  private provideDbRoleRepository(bind: interfaces.Bind): void {
    bind<IRoleRepository>(DOMAIN_REPOSITORY_IDENTIFIERS.ROLE_REPOSITORY).to(
      DbRoleRepository
    );
  }
}
