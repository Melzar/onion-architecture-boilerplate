import { inject, injectable } from 'inversify';

import { IStateService } from 'core/applicationServices/State/IStateService';
import { IStateRepository } from 'core/domainServices/State/IStateRepository';
import { FetchStateRequest } from 'core/applicationServices/State/requests/FetchStateRequest';
import { GetStateRepositoryRequest } from 'core/domainServices/State/request/GetStateRepositoryRequest';
import { State } from 'core/domain/State/State';
import { DOMAIN_REPOSITORY_IDENTIFIERS } from 'core/CoreModuleSymbols';

@injectable()
export class StateService implements IStateService {
  constructor(
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.STATE_REPOSITORY)
    private readonly stateRepository: IStateRepository
  ) {}

  fetchState({ id }: FetchStateRequest): Promise<State> {
    return this.stateRepository.getState(new GetStateRepositoryRequest(id));
  }

  fetchStates(): Promise<State[]> {
    return this.stateRepository.getStates();
  }
}
