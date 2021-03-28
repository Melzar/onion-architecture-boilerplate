import { interfaces } from 'inversify';

import { BaseModule } from 'dependency/BaseModule';
import { StateRepository } from 'infrastructure/database/repository/State/StateRepository';
import {
  DOMAIN_APPLICATION_SERVICE_IDENTIFIERS,
  DOMAIN_REPOSITORY_IDENTIFIERS,
} from 'core/CoreModuleSymbols';
import { IStateRepository } from 'core/domainServices/State/IStateRepository';
import { StateService } from 'core/applicationServices/State/StateService';
import { IStateService } from 'core/applicationServices/State/IStateService';
import { UI_SCHEMA_IDENTIFIERS } from 'ui/UiModuleSymbols';
import { StateQuery } from 'ui/Administration/State/graphql/StateQuery';
import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';

export class StateModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  init(bind: interfaces.Bind): void {
    this.provideStateRepository(bind);

    this.provideStateService(bind);

    this.provideStateQuery(bind);
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

  private provideStateQuery(bind: interfaces.Bind): void {
    bind<IResolver>(UI_SCHEMA_IDENTIFIERS.STATE_QUERIES).to(StateQuery);
  }
}
