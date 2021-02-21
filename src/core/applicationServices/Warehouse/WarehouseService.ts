import { inject, injectable } from 'inversify';

import { DOMAIN_REPOSITORY_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { IWarehouseService } from 'core/applicationServices/Warehouse/IWarehouseService';
import { IWarehouseRepository } from 'core/domainServices/Warehouse/IWarehouseRepository';
import { FetchWarehouseRequest } from 'core/applicationServices/Warehouse/requests/FetchWarehouseRequest';
import { Warehouse } from 'core/domain/Warehouse/Warehouse';
import { GetWarehouseRepositoryRequest } from 'core/domainServices/Warehouse/request/GetWarehouseRepositoryRequest';

@injectable()
export class WarehouseService implements IWarehouseService {
  constructor(
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.WAREHOUSE_REPOSITORY)
    private readonly warehouseRepository: IWarehouseRepository
  ) {}

  fetchWarehouse({ id }: FetchWarehouseRequest): Promise<Warehouse> {
    return this.warehouseRepository.getWarehouse(
      new GetWarehouseRepositoryRequest(id)
    );
  }

  fetchWarehouses(): Promise<Warehouse[]> {
    return this.warehouseRepository.getWarehouses();
  }
}
