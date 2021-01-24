import { State } from 'core/domain/State/State';
import { FetchStateRequest } from 'core/applicationServices/State/requests/FetchStateRequest';

export interface IStateService {
  fetchState(request: FetchStateRequest): Promise<State>;
  fetchStates(): Promise<State[]>;
}
