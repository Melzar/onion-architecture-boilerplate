import { GetStateRepositoryRequest } from 'core/domainServices/State/request/GetStateRepositoryRequest';
import { State } from 'core/domain/State/State';

export interface IStateRepository {
  getState(request: GetStateRepositoryRequest): Promise<State>;
  getStates(): Promise<State[]>;
}
