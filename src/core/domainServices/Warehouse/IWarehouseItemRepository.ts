import { WarehouseItem } from 'core/domain/Warehouse/WarehouseItem';
import { GetWarehouseItemRepositoryRequest } from 'core/domainServices/Warehouse/request/GetWarehouseItemRepositoryRequest';

export interface IWarehouseItemRepository {
  getWarehouseItem(
    request: GetWarehouseItemRepositoryRequest
  ): Promise<WarehouseItem>;
  getWarehouseItems(): Promise<WarehouseItem[]>;
}
