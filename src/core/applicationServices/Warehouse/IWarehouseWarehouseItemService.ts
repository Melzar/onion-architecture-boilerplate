import { WarehouseItem } from 'core/domain/Warehouse/WarehouseItem';
import { FetchWarehouseItemsRequest } from 'core/applicationServices/WarehouseItem/requests/FetchWarehouseItemsRequest';

export interface IWarehouseWarehouseItemService {
  fetchWarehouseItems: (
    request: FetchWarehouseItemsRequest
  ) => Promise<WarehouseItem[]>;
}
