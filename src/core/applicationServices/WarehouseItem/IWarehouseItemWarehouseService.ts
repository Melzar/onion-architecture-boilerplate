import { Warehouse } from 'core/domain/Warehouse/Warehouse';
import { FetchWarehouseItemWarehouseRequest } from 'core/applicationServices/WarehouseItem/requests/FetchWarehouseItemWarehouseRequest';

export interface IWarehouseItemWarehouseService {
  fetchWarehouse(
    request: FetchWarehouseItemWarehouseRequest
  ): Promise<Warehouse>;
}
