import { inject, injectable } from 'inversify';

import { IWarehouseWarehouseItemService } from 'core/applicationServices/Warehouse/IWarehouseWarehouseItemService';
import { FetchWarehouseItemsRequest } from 'core/applicationServices/WarehouseItem/requests/FetchWarehouseItemsRequest';
import { IWarehouseWarehouseItemRepository } from 'core/domainServices/Warehouse/IWarehouseWarehouseItemRepository';
import { GetWarehouseItemsRepositoryRequest } from 'core/domainServices/WarehouseItem/requests/GetWarehouseItemsRepositoryRequest';
import { DOMAIN_REPOSITORY_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { WarehouseItem } from 'core/domain/Warehouse/WarehouseItem';

@injectable()
export class WarehouseWarehouseItemService
  implements IWarehouseWarehouseItemService {
  constructor(
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.WAREHOUSE_WAREHOUSE_ITEM_REPOSITORY)
    private readonly warehouseWarehouseItemRepository: IWarehouseWarehouseItemRepository
  ) {}

  fetchWarehouseItems({
    warehouseId,
  }: FetchWarehouseItemsRequest): Promise<WarehouseItem[]> {
    return this.warehouseWarehouseItemRepository.getWarehouseItems(
      new GetWarehouseItemsRepositoryRequest(warehouseId)
    );
  }
}
