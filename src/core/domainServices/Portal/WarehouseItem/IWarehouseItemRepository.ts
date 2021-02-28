import { WarehouseItem } from 'core/domain/Warehouse/WarehouseItem';
import { AddWarehouseItemRepositoryRequest } from 'core/domainServices/Portal/WarehouseItem/requests/AddWarehouseItemRepositoryRequest';

export interface IWarehouseItemRepository {
  addWarehouseItem(
    request: AddWarehouseItemRepositoryRequest
  ): Promise<WarehouseItem>;
}
