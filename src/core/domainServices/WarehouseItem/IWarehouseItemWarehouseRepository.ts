import { Warehouse } from 'core/domain/Warehouse/Warehouse';
import { GetWarehouseItemWarehouseRepositoryRequest } from 'core/domainServices/WarehouseItem/requests/GetWarehouseItemWarehouseRepositoryRequest';

export interface IWarehouseItemWarehouseRepository {
  getWarehouse(
    request: GetWarehouseItemWarehouseRepositoryRequest
  ): Promise<Warehouse>;
}
