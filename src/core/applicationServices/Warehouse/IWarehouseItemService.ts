import { WarehouseItem } from 'core/domain/Warehouse/WarehouseItem';
import { FetchWarehouseItemRequest } from 'core/applicationServices/Warehouse/requests/FetchWarehouseItemRequest';

export interface IWarehouseItemService {
  fetchWarehouseItem: (
    request: FetchWarehouseItemRequest
  ) => Promise<WarehouseItem>;
  fetchWarehouseItems: () => Promise<WarehouseItem[]>;
}
