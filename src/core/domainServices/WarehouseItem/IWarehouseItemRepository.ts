import { WarehouseItem } from 'core/domain/Warehouse/WarehouseItem';
import { GetWarehouseItemRepositoryRequest } from 'core/domainServices/WarehouseItem/requests/GetWarehouseItemRepositoryRequest';
import { CreateWarehouseItemRepositoryRequest } from 'core/domainServices/WarehouseItem/requests/CreateWarehouseItemRepositoryRequest';
import { UpdateWarehouseItemRepositoryRequest } from 'core/domainServices/WarehouseItem/requests/UpdateWarehouseItemRepositoryRequest';

export interface IWarehouseItemRepository {
  getWarehouseItem(
    request: GetWarehouseItemRepositoryRequest
  ): Promise<WarehouseItem>;
  getWarehouseItems(): Promise<WarehouseItem[]>;
  createWarehouseItem(
    request: CreateWarehouseItemRepositoryRequest
  ): Promise<WarehouseItem>;
  updateWarehouseItem(
    request: UpdateWarehouseItemRepositoryRequest
  ): Promise<WarehouseItem>;
}
