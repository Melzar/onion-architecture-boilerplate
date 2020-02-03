import { interfaces } from 'inversify';

import { IMapper } from 'core/common/mapper/IMapper';

import { BaseModule } from 'dependency/BaseModule';

import { INFRASTRUCTURE_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';

import { UserEntityToUserDomainMapper } from 'infrastructure/db/mappings/User/UserEntityToUserDomainMapper';
import { DBMapper } from 'infrastructure/db/mappings/DBMapper';
import { RoleEntityToRoleDomainMapper } from 'infrastructure/db/mappings/Role/RoleEntityToRoleDomainMapper';
import { EquipmentEntityToEquipmentDomainMapper } from 'infrastructure/db/mappings/Equipment/EquipmentEntityToEquipmentDomainMapper';

export class InfrastructureModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideRoleMapper(bind);
    this.provideUserMapper(bind);
    this.provideEquipmentMapper(bind);

    this.provideDBMapper(bind);
  }

  private provideDBMapper(bind: interfaces.Bind): void {
    bind<DBMapper>(INFRASTRUCTURE_IDENTIFIERS.DB_MAPPER).to(DBMapper);
  }

  private provideUserMapper(bind: interfaces.Bind): void {
    bind<IMapper>(INFRASTRUCTURE_IDENTIFIERS.USER_MAPPER).to(
      UserEntityToUserDomainMapper
    );
  }

  private provideRoleMapper(bind: interfaces.Bind): void {
    bind<IMapper>(INFRASTRUCTURE_IDENTIFIERS.ROLE_MAPPER).to(
      RoleEntityToRoleDomainMapper
    );
  }

  private provideEquipmentMapper(bind: interfaces.Bind): void {
    bind<IMapper>(INFRASTRUCTURE_IDENTIFIERS.EQUIPMENT_MAPPER).to(
      EquipmentEntityToEquipmentDomainMapper
    );
  }
}
