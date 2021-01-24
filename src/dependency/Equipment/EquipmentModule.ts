import { interfaces } from 'inversify';

import { BaseModule } from 'dependency/BaseModule';

import { IEquipmentService } from 'core/applicationServices/Equipment/IEquipmentService';
import { EquipmentService } from 'core/applicationServices/Equipment/EquipmentService';
import { IEquipmentRepository } from 'core/domainServices/Equipment/IEquipmentRepository';
import { IEquipmentUnitOfWork } from 'core/domainServices/Equipment/IEquipmentUnitOfWork';

import { IMapper } from 'core/common/mapper/IMapper';

import {
  DOMAIN_APPLICATION_SERVICE_IDENTIFIERS,
  DOMAIN_REPOSITORY_IDENTIFIERS,
  DOMAIN_UNIT_OF_WORK_IDENTIFIERS,
} from 'core/CoreModuleSymbols';

import { EquipmentRepository } from 'infrastructure/database/repository/Equipment/EquipmentRepository';
import { INFRASTRUCTURE_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';
import { EquipmentEntityToEquipmentDomainMapper } from 'infrastructure/database/mappings/Equipment/EquipmentEntityToEquipmentDomainMapper';
import { EquipmentUnitOfWork } from 'infrastructure/database/repository/Equipment/EquipmentUnitOfWork';

import { UI_SCHEMA_IDENTIFIERS } from 'ui/UiModuleSymbols';
import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { EquipmentQuery } from 'ui/Equipment/graphql/EquipmentQuery';
import { EquipmentMutation } from 'ui/Equipment/graphql/EquipmentMutation';
import { EquipmentSubquery } from 'ui/Equipment/graphql/EquipmentSubquery';
import { EquipmentStateRateEntityToEquipmentStateRateDomainMapper } from 'infrastructure/database/mappings/Equipment/EquipmentStateRateEntityToEquipmentStateRateDomainMapper';

export class EquipmentModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideEquipmentRepository(bind);
    this.provideEquipmentUnitOfWork(bind);

    this.provideEquipmentMapper(bind);
    this.provideEquipmentStateRateMapper(bind);
    this.provideEquipmentService(bind);

    this.provideEquipmentQuery(bind);
    this.provideEquipmentMutation(bind);
    this.provideEquipmentSubquery(bind);
  }

  private provideEquipmentRepository(bind: interfaces.Bind): void {
    bind<IEquipmentRepository>(
      DOMAIN_REPOSITORY_IDENTIFIERS.EQUIPMENT_REPOSITORY
    ).to(EquipmentRepository);
  }

  private provideEquipmentUnitOfWork(bind: interfaces.Bind): void {
    bind<IEquipmentUnitOfWork>(
      DOMAIN_UNIT_OF_WORK_IDENTIFIERS.EQUIPMENT_UNIT_OF_WORK
    ).to(EquipmentUnitOfWork);
  }

  private provideEquipmentMapper(bind: interfaces.Bind): void {
    bind<IMapper>(INFRASTRUCTURE_IDENTIFIERS.EQUIPMENT_MAPPER).to(
      EquipmentEntityToEquipmentDomainMapper
    );
  }

  private provideEquipmentStateRateMapper(bind: interfaces.Bind): void {
    bind<IMapper>(INFRASTRUCTURE_IDENTIFIERS.EQUIPMENT_STATE_RATE_MAPPER).to(
      EquipmentStateRateEntityToEquipmentStateRateDomainMapper
    );
  }

  private provideEquipmentService(bind: interfaces.Bind): void {
    bind<IEquipmentService>(
      DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.EQUIPMENT_SERVICE
    ).to(EquipmentService);
  }

  private provideEquipmentQuery(bind: interfaces.Bind): void {
    bind<IResolver>(UI_SCHEMA_IDENTIFIERS.EQUIPMENT_QUERIES).to(EquipmentQuery);
  }

  private provideEquipmentMutation(bind: interfaces.Bind): void {
    bind<IResolver>(UI_SCHEMA_IDENTIFIERS.EQUIPMENT_MUTATIONS).to(
      EquipmentMutation
    );
  }

  private provideEquipmentSubquery(bind: interfaces.Bind): void {
    bind<IResolver>(UI_SCHEMA_IDENTIFIERS.EQUIPMENT_SUBQUERIES).to(
      EquipmentSubquery
    );
  }
}
