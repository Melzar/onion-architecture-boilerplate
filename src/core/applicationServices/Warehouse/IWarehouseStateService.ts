import { State } from 'core/domain/State/State';
import { FetchWarehouseStateRequest } from 'core/applicationServices/Warehouse/requests/FetchWarehouseStateRequest';

export interface IWarehouseStateService {
  fetchState: (request: FetchWarehouseStateRequest) => Promise<State>;
}
