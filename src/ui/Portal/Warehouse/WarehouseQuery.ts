import { inject, injectable } from 'inversify';

import { IResolverObject } from 'apollo-server-express';

import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { DOMAIN_APPLICATION_SERVICE_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { IWarehouseService } from 'core/applicationServices/Portal/Warehouse/IWarehouseService';

@injectable()
export class WarehouseQuery implements IResolver<IResolverObject> {
  readonly resolvers: IResolverObject;

  constructor(
    @inject(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.PORTAL_WAREHOUSE_SERVICE)
    private readonly warehouseService: IWarehouseService
  ) {
    this.resolvers = {
      availableWarehouses: this.availableWarehouses,
    };
  }

  private availableWarehouses = () =>
    this.warehouseService.fetchAvailableWarehouses();
}
