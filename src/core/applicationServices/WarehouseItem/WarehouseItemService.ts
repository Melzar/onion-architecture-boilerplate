import { inject, injectable } from 'inversify';

import { DOMAIN_REPOSITORY_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { IWarehouseItemRepository } from 'core/domainServices/WarehouseItem/IWarehouseItemRepository';
import { IWarehouseItemService } from 'core/applicationServices/WarehouseItem/IWarehouseItemService';
import { FetchWarehouseItemRequest } from 'core/applicationServices/WarehouseItem/requests/FetchWarehouseItemRequest';
import { WarehouseItem } from 'core/domain/Warehouse/WarehouseItem';
import { CreateWarehouseItemRequest } from 'core/applicationServices/WarehouseItem/requests/CreateWarehouseItemRequest';
import { UpdateWarehouseItemRequest } from 'core/applicationServices/WarehouseItem/requests/UpdateWarehouseItemRequest';
import { CreateWarehouseItemRepositoryRequest } from 'core/domainServices/WarehouseItem/requests/CreateWarehouseItemRepositoryRequest';
import { UpdateWarehouseItemRepositoryRequest } from 'core/domainServices/WarehouseItem/requests/UpdateWarehouseItemRepositoryRequest';

@injectable()
export class WarehouseItemService implements IWarehouseItemService {
  constructor(
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.WAREHOUSE_ITEM_REPOSITORY)
    private readonly warehouseItemRepository: IWarehouseItemRepository
  ) {}

  fetchWarehouseItem({
    id,
  }: FetchWarehouseItemRequest): Promise<WarehouseItem> {
    return this.warehouseItemRepository.getWarehouseItem(
      new FetchWarehouseItemRequest(id)
    );
  }

  fetchWarehouseItems(): Promise<WarehouseItem[]> {
    return this.warehouseItemRepository.getWarehouseItems();
  }

  createWarehouseItem({
    name,
    cost,
    warehouseID,
    equipmentID,
  }: CreateWarehouseItemRequest): Promise<WarehouseItem> {
    return this.warehouseItemRepository.createWarehouseItem(
      new CreateWarehouseItemRepositoryRequest(
        name,
        cost,
        warehouseID,
        equipmentID
      )
    );
  }

  updateWarehouseItem({
    id,
    name,
    cost,
    equipmentID,
    warehouseID,
  }: UpdateWarehouseItemRequest): Promise<WarehouseItem> {
    return this.warehouseItemRepository.updateWarehouseItem(
      new UpdateWarehouseItemRepositoryRequest(
        id,
        name,
        cost,
        warehouseID,
        equipmentID
      )
    );
  }
}
