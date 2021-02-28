import { WarehouseItem } from 'core/domain/Warehouse/WarehouseItem';
import { AddWarehouseItemRequest } from 'core/applicationServices/Portal/WarehouseItem/requests/AddWarehouseItemRequest';

export interface IWarehouseItemService {
  addWarehouseItem(request: AddWarehouseItemRequest): Promise<WarehouseItem>;
}
