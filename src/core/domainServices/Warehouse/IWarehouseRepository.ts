import { Warehouse } from 'core/domain/Warehouse/Warehouse';
import { GetWarehouseRepositoryRequest } from 'core/domainServices/Warehouse/request/GetWarehouseRepositoryRequest';
import { CreateWarehouseRepositoryRequest } from 'core/domainServices/Warehouse/request/CreateWarehouseRepositoryRequest';
import { UpdateWarehouseRepositoryRequest } from 'core/domainServices/Warehouse/request/UpdateWarehouseRepositoryRequest';

export interface IWarehouseRepository {
  getWarehouse(request: GetWarehouseRepositoryRequest): Promise<Warehouse>;
  getWarehouses(): Promise<Warehouse[]>;
  createWarehouse(
    request: CreateWarehouseRepositoryRequest
  ): Promise<Warehouse>;
  updateWarehouse(
    request: UpdateWarehouseRepositoryRequest
  ): Promise<Warehouse>;
}
