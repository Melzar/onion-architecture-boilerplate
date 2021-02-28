import { State } from 'core/domain/State/State';
import { GetWarehouseStateRepositoryRequest } from 'core/domainServices/Warehouse/request/GetWarehouseStateRepositoryRequest';

export interface IWarehouseStateRepository {
  getState: (request: GetWarehouseStateRepositoryRequest) => Promise<State>;
}
