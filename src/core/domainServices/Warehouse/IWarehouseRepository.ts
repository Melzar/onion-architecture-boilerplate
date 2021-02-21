import { Warehouse } from 'core/domain/Warehouse/Warehouse';
import { GetWarehouseRepositoryRequest } from 'core/domainServices/Warehouse/request/GetWarehouseRepositoryRequest';

export interface IWarehouseRepository {
  getWarehouse(request: GetWarehouseRepositoryRequest): Promise<Warehouse>;
  getWarehouses(): Promise<Warehouse[]>;
}
