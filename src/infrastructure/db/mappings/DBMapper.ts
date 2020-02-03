import { Mapper } from '@wufe/mapper';
import { inject, injectable } from 'inversify';

import { UserEntityToUserDomainMapper } from 'infrastructure/db/mappings/User/UserEntityToUserDomainMapper';
import { INFRASTRUCTURE_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';
import { EquipmentEntityToEquipmentDomainMapper } from 'infrastructure/db/mappings/Equipment/EquipmentEntityToEquipmentDomainMapper';
import { RoleEntityToRoleDomainMapper } from 'infrastructure/db/mappings/Role/RoleEntityToRoleDomainMapper';

@injectable()
export class DBMapper {
  public readonly mapper: Mapper;

  constructor(
    @inject(INFRASTRUCTURE_IDENTIFIERS.USER_MAPPER)
    private readonly userEntityToUserDomainMapper: UserEntityToUserDomainMapper,
    @inject(INFRASTRUCTURE_IDENTIFIERS.EQUIPMENT_MAPPER)
    private readonly equipmentEntityToEquipmentDomainMapper: EquipmentEntityToEquipmentDomainMapper,
    @inject(INFRASTRUCTURE_IDENTIFIERS.ROLE_MAPPER)
    private readonly roleEntityToRoleDomainMapper: RoleEntityToRoleDomainMapper
  ) {
    this.mapper = new Mapper().withConfiguration(configuration =>
      configuration
        .shouldIgnoreSourcePropertiesIfNotInDestination(true)
        .shouldAutomaticallyMapArrays(true)
    );

    this.initialize();
  }

  private initialize(): void {
    this.userEntityToUserDomainMapper.configureMappings(this.mapper);
    this.equipmentEntityToEquipmentDomainMapper.configureMappings(this.mapper);
    this.roleEntityToRoleDomainMapper.configureMappings(this.mapper);
  }
}
