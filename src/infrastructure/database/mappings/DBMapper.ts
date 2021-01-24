import { Mapper } from '@wufe/mapper';
import { inject, injectable } from 'inversify';

import { INFRASTRUCTURE_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';

import { UserEntityToUserDomainMapper } from 'infrastructure/database/mappings/User/UserEntityToUserDomainMapper';
import { EquipmentEntityToEquipmentDomainMapper } from 'infrastructure/database/mappings/Equipment/EquipmentEntityToEquipmentDomainMapper';
import { EquipmentStateRateEntityToEquipmentStateRateDomainMapper } from 'infrastructure/database/mappings/Equipment/EquipmentStateRateEntityToEquipmentStateRateDomainMapper';
import { RoleEntityToRoleDomainMapper } from 'infrastructure/database/mappings/Role/RoleEntityToRoleDomainMapper';
import { RateEntityToRateDomainMapper } from 'infrastructure/database/mappings/Rate/RateEntityToRateDomainMapper';
import { StateEntityToStateDomainMapper } from 'infrastructure/database/mappings/State/StateEntityToStateDomainMapper';

@injectable()
export class DBMapper {
  public readonly mapper: Mapper;

  constructor(
    @inject(INFRASTRUCTURE_IDENTIFIERS.USER_MAPPER)
    private readonly userEntityToUserDomainMapper: UserEntityToUserDomainMapper,
    @inject(INFRASTRUCTURE_IDENTIFIERS.EQUIPMENT_MAPPER)
    private readonly equipmentEntityToEquipmentDomainMapper: EquipmentEntityToEquipmentDomainMapper,
    @inject(INFRASTRUCTURE_IDENTIFIERS.EQUIPMENT_STATE_RATE_MAPPER)
    private readonly equipmentStateRateEntityToEquipmentStateRateDomainMapper: EquipmentStateRateEntityToEquipmentStateRateDomainMapper,
    @inject(INFRASTRUCTURE_IDENTIFIERS.ROLE_MAPPER)
    private readonly roleEntityToRoleDomainMapper: RoleEntityToRoleDomainMapper,
    @inject(INFRASTRUCTURE_IDENTIFIERS.RATE_MAPPER)
    private readonly rateEntityToRateDomainMapper: RateEntityToRateDomainMapper,
    @inject(INFRASTRUCTURE_IDENTIFIERS.STATE_MAPPER)
    private readonly stateEntityToStateDomainMapper: StateEntityToStateDomainMapper
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
    this.equipmentStateRateEntityToEquipmentStateRateDomainMapper.configureMappings(
      this.mapper
    );
    this.roleEntityToRoleDomainMapper.configureMappings(this.mapper);
    this.rateEntityToRateDomainMapper.configureMappings(this.mapper);
    this.stateEntityToStateDomainMapper.configureMappings(this.mapper);
  }
}
