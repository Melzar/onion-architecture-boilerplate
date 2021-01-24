import { interfaces } from 'inversify';

import { BaseModule } from 'dependency/BaseModule';
import { INFRASTRUCTURE_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';
import { StateEntityToStateDomainMapper } from 'infrastructure/database/mappings/State/StateEntityToStateDomainMapper';
import { StateRepository } from 'infrastructure/database/repository/State/StateRepository';
import {
  DOMAIN_APPLICATION_SERVICE_IDENTIFIERS,
  DOMAIN_REPOSITORY_IDENTIFIERS,
} from 'core/CoreModuleSymbols';
import { IMapper } from 'core/common/mapper/IMapper';
import { IStateRepository } from 'core/domainServices/State/IStateRepository';
import { StateService } from 'core/applicationServices/State/StateService';
import { IStateService } from 'core/applicationServices/State/IStateService';

export class StateModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  init(bind: interfaces.Bind): void {
    this.provideStateMapper(bind);

    this.provideStateRepository(bind);

    this.provideStateService(bind);
  }

  private provideStateMapper(bind: interfaces.Bind): void {
    bind<IMapper>(INFRASTRUCTURE_IDENTIFIERS.STATE_MAPPER).to(
      StateEntityToStateDomainMapper
    );
  }

  private provideStateRepository(bind: interfaces.Bind): void {
    bind<IStateRepository>(DOMAIN_REPOSITORY_IDENTIFIERS.STATE_REPOSITORY).to(
      StateRepository
    );
  }

  private provideStateService(bind: interfaces.Bind): void {
    bind<IStateService>(
      DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.STATE_SERVICE
    ).to(StateService);
  }
}
