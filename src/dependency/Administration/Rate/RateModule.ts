import { interfaces } from 'inversify';

import { BaseModule } from 'dependency/BaseModule';
import { RateRepository } from 'infrastructure/database/repository/Rate/RateRepository';
import {
  DOMAIN_APPLICATION_SERVICE_IDENTIFIERS,
  DOMAIN_REPOSITORY_IDENTIFIERS,
} from 'core/CoreModuleSymbols';
import { IRateRepository } from 'core/domainServices/Rate/IRateRepository';
import { RateService } from 'core/applicationServices/Rate/RateService';
import { IRateService } from 'core/applicationServices/Rate/IRateService';
import { UI_SCHEMA_IDENTIFIERS } from 'ui/UiModuleSymbols';
import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { RateQuery } from 'ui/Administration/Rate/graphql/RateQuery';

export class RateModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  init(bind: interfaces.Bind): void {
    this.provideRateRepository(bind);

    this.provideRateService(bind);

    this.provideRateQuery(bind);
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

  private provideRateQuery(bind: interfaces.Bind): void {
    bind<IResolver>(UI_SCHEMA_IDENTIFIERS.RATE_QUERIES).to(RateQuery);
  }
}
