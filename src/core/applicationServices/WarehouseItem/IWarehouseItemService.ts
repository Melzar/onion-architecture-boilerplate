import { WarehouseItem } from 'core/domain/Warehouse/WarehouseItem';
import { FetchWarehouseItemRequest } from 'core/applicationServices/WarehouseItem/requests/FetchWarehouseItemRequest';
import { CreateWarehouseItemRequest } from 'core/applicationServices/WarehouseItem/requests/CreateWarehouseItemRequest';
import { UpdateWarehouseItemRequest } from 'core/applicationServices/WarehouseItem/requests/UpdateWarehouseItemRequest';

export interface IWarehouseItemService {
  fetchWarehouseItem: (
    request: FetchWarehouseItemRequest
  ) => Promise<WarehouseItem>;
  fetchWarehouseItems: () => Promise<WarehouseItem[]>;
  createWarehouseItem: (
    request: CreateWarehouseItemRequest
  ) => Promise<WarehouseItem>;
  updateWarehouseItem: (
    request: UpdateWarehouseItemRequest
  ) => Promise<WarehouseItem>;
}
