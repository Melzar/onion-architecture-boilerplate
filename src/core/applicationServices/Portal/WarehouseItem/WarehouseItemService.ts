import { inject, injectable } from 'inversify';

import { DOMAIN_REPOSITORY_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { IWarehouseItemService } from 'core/applicationServices/Portal/WarehouseItem/IWarehouseItemService';
import { IWarehouseItemRepository } from 'core/domainServices/Portal/WarehouseItem/IWarehouseItemRepository';
import { AddWarehouseItemRequest } from 'core/applicationServices/Portal/WarehouseItem/requests/AddWarehouseItemRequest';
import { WarehouseItem } from 'core/domain/Warehouse/WarehouseItem';
import { AddWarehouseItemRepositoryRequest } from 'core/domainServices/Portal/WarehouseItem/requests/AddWarehouseItemRepositoryRequest';

@injectable()
export class WarehouseItemService implements IWarehouseItemService {
  constructor(
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.PORTAL_WAREHOUSE_ITEM_REPOSITORY)
    private readonly warehouseItemRepository: IWarehouseItemRepository
  ) {}

  addWarehouseItem({
    equipmentID,
    warehouseID,
    name,
  }: AddWarehouseItemRequest): Promise<WarehouseItem> {
    return this.warehouseItemRepository.addWarehouseItem(
      new AddWarehouseItemRepositoryRequest(equipmentID, warehouseID, name)
    );
  }
}
