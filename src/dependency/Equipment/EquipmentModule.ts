import { interfaces } from 'inversify';

import { BaseModule } from 'dependency/BaseModule';

import { IEquipmentService } from 'core/applicationServices/Equipment/IEquipmentService';
import { EquipmentService } from 'core/applicationServices/Equipment/EquipmentService';
import { IEquipmentRepository } from 'core/domainServices/Equipment/IEquipmentRepository';

import {
  DOMAIN_APPLICATION_SERVICE_IDENTIFIERS,
  DOMAIN_REPOSITORY_IDENTIFIERS,
} from 'core/CoreModuleSymbols';

import { DbEquipmentRepository } from 'infrastructure/repository/DbEquipmentRepository';
import { IMapper } from 'core/common/mapper/IMapper';
import { INFRASTRUCTURE_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';
import { EquipmentEntityToEquipmentDomainMapper } from 'infrastructure/db/mappings/Equipment/EquipmentEntityToEquipmentDomainMapper';

export class EquipmentModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideDbEquipmentRepository(bind);

    this.provideEquipmentMapper(bind);
    this.provideEquipmentService(bind);
  }

  private provideDbEquipmentRepository(bind: interfaces.Bind): void {
    bind<IEquipmentRepository>(
      DOMAIN_REPOSITORY_IDENTIFIERS.EQUIPMENT_REPOSITORY
    ).to(DbEquipmentRepository);
  }

  private provideEquipmentService(bind: interfaces.Bind): void {
    bind<IEquipmentService>(
      DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.EQUIPMENT_SERVICE
    ).to(EquipmentService);
  }

  private provideEquipmentMapper(bind: interfaces.Bind): void {
    bind<IMapper>(INFRASTRUCTURE_IDENTIFIERS.EQUIPMENT_MAPPER).to(
      EquipmentEntityToEquipmentDomainMapper
    );
  }
}
