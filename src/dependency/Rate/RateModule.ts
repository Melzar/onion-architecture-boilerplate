import { interfaces } from 'inversify';

import { BaseModule } from 'dependency/BaseModule';
import { INFRASTRUCTURE_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';
import { RateEntityToRateDomainMapper } from 'infrastructure/database/mappings/Rate/RateEntityToRateDomainMapper';
import { RateRepository } from 'infrastructure/database/repository/Rate/RateRepository';
import { IMapper } from 'core/common/mapper/IMapper';
import {
  DOMAIN_APPLICATION_SERVICE_IDENTIFIERS,
  DOMAIN_REPOSITORY_IDENTIFIERS,
} from 'core/CoreModuleSymbols';
import { IRateRepository } from 'core/domainServices/Rate/IRateRepository';
import { RateService } from 'core/applicationServices/Rate/RateService';
import { IRateService } from 'core/applicationServices/Rate/IRateService';

export class RateModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  init(bind: interfaces.Bind): void {
    this.provideRateMapper(bind);

    this.provideRateRepository(bind);

    this.provideRateService(bind);
  }

  private provideRateMapper(bind: interfaces.Bind): void {
    bind<IMapper>(INFRASTRUCTURE_IDENTIFIERS.RATE_MAPPER).to(
      RateEntityToRateDomainMapper
    );
  }

  private provideRateRepository(bind: interfaces.Bind): void {
    bind<IRateRepository>(DOMAIN_REPOSITORY_IDENTIFIERS.RATE_REPOSITORY).to(
      RateRepository
    );
  }

  private provideRateService(bind: interfaces.Bind): void {
    bind<IRateService>(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.RATE_SERVICE).to(
      RateService
    );
  }
}
