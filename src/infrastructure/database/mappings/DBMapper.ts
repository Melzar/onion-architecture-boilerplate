import { Mapper } from '@wufe/mapper';
import { inject, injectable } from 'inversify';

import { INFRASTRUCTURE_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';

import { UserEntityToUserDomainMapper } from 'infrastructure/database/mappings/User/UserEntityToUserDomainMapper';
import { EquipmentEntityToEquipmentDomainMapper } from 'infrastructure/database/mappings/Equipment/EquipmentEntityToEquipmentDomainMapper';
import { RoleEntityToRoleDomainMapper } from 'infrastructure/database/mappings/Role/RoleEntityToRoleDomainMapper';
import { RateEntityToRateDomainMapper } from 'infrastructure/database/mappings/Rate/RateEntityToRateDomainMapper';
import { StateEntityToStateDomainMapper } from 'infrastructure/database/mappings/State/StateEntityToStateDomainMapper';
import { WarehouseEntityToWarehouseDomainMapper } from 'infrastructure/database/mappings/Warehouse/WarehouseEntityToWarehouseDomainMapper';

@injectable()
export class DBMapper {
  public readonly mapper: Mapper;

  constructor(
    @inject(INFRASTRUCTURE_IDENTIFIERS.USER_MAPPER)
    private readonly userEntityToUserDomainMapper: UserEntityToUserDomainMapper,
    @inject(INFRASTRUCTURE_IDENTIFIERS.EQUIPMENT_MAPPER)
    private readonly equipmentEntityToEquipmentDomainMapper: EquipmentEntityToEquipmentDomainMapper,
    @inject(INFRASTRUCTURE_IDENTIFIERS.ROLE_MAPPER)
    private readonly roleEntityToRoleDomainMapper: RoleEntityToRoleDomainMapper,
    @inject(INFRASTRUCTURE_IDENTIFIERS.RATE_MAPPER)
    private readonly rateEntityToRateDomainMapper: RateEntityToRateDomainMapper,
    @inject(INFRASTRUCTURE_IDENTIFIERS.STATE_MAPPER)
    private readonly stateEntityToStateDomainMapper: StateEntityToStateDomainMapper,
    @inject(INFRASTRUCTURE_IDENTIFIERS.WAREHOUSE_MAPPER)
    private readonly warehouseEntityToWarehouseDomainMapper: WarehouseEntityToWarehouseDomainMapper,
    @inject(INFRASTRUCTURE_IDENTIFIERS.WAREHOUSE_ITEM_MAPPER)
    private readonly warehouseItemEntityToWarehouseItemDomainMapper: WarehouseEntityToWarehouseDomainMapper
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
    this.rateEntityToRateDomainMapper.configureMappings(this.mapper);
    this.stateEntityToStateDomainMapper.configureMappings(this.mapper);
    this.warehouseEntityToWarehouseDomainMapper.configureMappings(this.mapper);
    this.warehouseItemEntityToWarehouseItemDomainMapper.configureMappings(
      this.mapper
    );
  }
}
