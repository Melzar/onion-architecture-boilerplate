import { inject, injectable } from 'inversify';

import { DOMAIN_REPOSITORY_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { IWarehouseItemRepository } from 'core/domainServices/Warehouse/IWarehouseItemRepository';
import { IWarehouseItemService } from 'core/applicationServices/Warehouse/IWarehouseItemService';
import { FetchWarehouseItemRequest } from 'core/applicationServices/Warehouse/requests/FetchWarehouseItemRequest';
import { WarehouseItem } from 'core/domain/Warehouse/WarehouseItem';

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
}
