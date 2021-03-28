import { Mapper } from '@wufe/mapper';
import { injectable } from 'inversify';

import { UserEntityToUserDomain } from 'infrastructure/database/mappings/User/UserEntityToUserDomain';
import { EquipmentEntityToEquipmentDomain } from 'infrastructure/database/mappings/Equipment/EquipmentEntityToEquipmentDomain';
import { RoleEntityToRoleDomain } from 'infrastructure/database/mappings/Role/RoleEntityToRoleDomain';
import { RateEntityToRateDomain } from 'infrastructure/database/mappings/Rate/RateEntityToRateDomain';
import { StateEntityToStateDomain } from 'infrastructure/database/mappings/State/StateEntityToStateDomain';
import { WarehouseEntityToWarehouseDomain } from 'infrastructure/database/mappings/Warehouse/WarehouseEntityToWarehouseDomain';
import { WarehouseItemEntityToWarehouseItemDomain } from 'infrastructure/database/mappings/Warehouse/WarehouseItemEntityToWarehouseItemDomain';

@injectable()
export class DBMapper {
  public readonly mapper: Mapper;

  constructor() {
    this.mapper = new Mapper().withConfiguration(configuration =>
      configuration
        .shouldIgnoreSourcePropertiesIfNotInDestination(true)
        .shouldAutomaticallyMapArrays(true)
    );

    this.initialize();
  }

  private initialize(): void {
    UserEntityToUserDomain().configureMapping(this.mapper);
    EquipmentEntityToEquipmentDomain().configureMapping(this.mapper);
    RoleEntityToRoleDomain().configureMapping(this.mapper);
    RateEntityToRateDomain().configureMapping(this.mapper);
    StateEntityToStateDomain().configureMapping(this.mapper);
    WarehouseEntityToWarehouseDomain().configureMapping(this.mapper);
    WarehouseItemEntityToWarehouseItemDomain().configureMapping(this.mapper);
  }
}
