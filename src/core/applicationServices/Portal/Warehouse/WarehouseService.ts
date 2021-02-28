import { inject, injectable } from 'inversify';

import { DOMAIN_REPOSITORY_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { IWarehouseService } from 'core/applicationServices/Portal/Warehouse/IWarehouseService';
import { IWarehouseRepository } from 'core/domainServices/Portal/Warehouse/IWarehouseRepository';
import { Warehouse } from 'core/domain/Warehouse/Warehouse';

@injectable()
export class WarehouseService implements IWarehouseService {
  constructor(
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.PORTAL_WAREHOUSE_REPOSITORY)
    private readonly warehouseRepository: IWarehouseRepository
  ) {}

  fetchAvailableWarehouses(): Promise<Warehouse[]> {
    return this.warehouseRepository.getAvailableWarehouses();
  }
}
