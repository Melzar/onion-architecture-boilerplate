import { WarehouseItem } from 'core/domain/Warehouse/WarehouseItem';
import { GetWarehouseItemsRepositoryRequest } from 'core/domainServices/WarehouseItem/requests/GetWarehouseItemsRepositoryRequest';

export interface IWarehouseWarehouseItemRepository {
  getWarehouseItems: (
    request: GetWarehouseItemsRepositoryRequest
  ) => Promise<WarehouseItem[]>;
}
