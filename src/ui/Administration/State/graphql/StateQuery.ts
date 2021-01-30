import { inject, injectable } from 'inversify';

import { IResolverObject } from 'apollo-server-express';

import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { IStateService } from 'core/applicationServices/State/IStateService';
import { DOMAIN_APPLICATION_SERVICE_IDENTIFIERS } from 'core/CoreModuleSymbols';

@injectable()
export class StateQuery implements IResolver<IResolverObject> {
  readonly resolvers: IResolverObject;

  constructor(
    @inject(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.STATE_SERVICE)
    private readonly stateService: IStateService
  ) {
    this.resolvers = {
      states: this.states,
    };
  }

  private states = () => this.stateService.fetchStates();
}
