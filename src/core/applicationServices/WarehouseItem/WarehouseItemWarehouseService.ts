import { inject, injectable } from 'inversify';

import { DOMAIN_REPOSITORY_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { IWarehouseItemWarehouseService } from 'core/applicationServices/WarehouseItem/IWarehouseItemWarehouseService';
import { IWarehouseItemWarehouseRepository } from 'core/domainServices/WarehouseItem/IWarehouseItemWarehouseRepository';
import { Warehouse } from 'core/domain/Warehouse/Warehouse';
import { FetchWarehouseItemWarehouseRequest } from 'core/applicationServices/WarehouseItem/requests/FetchWarehouseItemWarehouseRequest';
import { GetWarehouseItemWarehouseRepositoryRequest } from 'core/domainServices/WarehouseItem/requests/GetWarehouseItemWarehouseRepositoryRequest';

@injectable()
export class WarehouseItemWarehouseService
  implements IWarehouseItemWarehouseService {
  constructor(
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.WAREHOUSE_ITEM_WAREHOUSE_REPOSITORY)
    private readonly warehouseItemWarehouseRepository: IWarehouseItemWarehouseRepository
  ) {}

  fetchWarehouse({
    warehouseItemId,
  }: FetchWarehouseItemWarehouseRequest): Promise<Warehouse> {
    return this.warehouseItemWarehouseRepository.getWarehouse(
      new GetWarehouseItemWarehouseRepositoryRequest(warehouseItemId)
    );
  }
}
