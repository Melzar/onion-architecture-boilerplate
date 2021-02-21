import { FetchWarehouseRequest } from 'core/applicationServices/Warehouse/requests/FetchWarehouseRequest';
import { Warehouse } from 'core/domain/Warehouse/Warehouse';

export interface IWarehouseService {
  fetchWarehouse: (request: FetchWarehouseRequest) => Promise<Warehouse>;
  fetchWarehouses: () => Promise<Warehouse[]>;
}
