import { FetchWarehouseRequest } from 'core/applicationServices/Warehouse/requests/FetchWarehouseRequest';
import { CreateWarehouseRequest } from 'core/applicationServices/Warehouse/requests/CreateWarehouseRequest';
import { UpdateWarehouseRequest } from 'core/applicationServices/Warehouse/requests/UpdateWarehouseRequest';
import { Warehouse } from 'core/domain/Warehouse/Warehouse';

export interface IWarehouseService {
  fetchWarehouse: (request: FetchWarehouseRequest) => Promise<Warehouse>;
  fetchWarehouses: () => Promise<Warehouse[]>;
  createWarehouse: (request: CreateWarehouseRequest) => Promise<Warehouse>;
  updateWarehouse: (request: UpdateWarehouseRequest) => Promise<Warehouse>;
}
