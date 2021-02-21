import { inject, injectable } from 'inversify';

import { IResolverObject } from 'apollo-server-express';

import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { DOMAIN_APPLICATION_SERVICE_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { IWarehouseService } from 'core/applicationServices/Warehouse/IWarehouseService';
import { GetWarehouseInput } from 'ui/Administration/Warehouse/graphql/inputs/GetWarehouseInput';
import { FetchWarehouseRequest } from 'core/applicationServices/Warehouse/requests/FetchWarehouseRequest';

@injectable()
export class WarehouseQuery implements IResolver<IResolverObject> {
  readonly resolvers: IResolverObject;

  constructor(
    @inject(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.WAREHOUSE_SERVICE)
    private readonly warehouseService: IWarehouseService
  ) {
    this.resolvers = {
      warehouses: this.warehouses,
      warehouse: this.warehouse,
    };
  }

  private warehouses = () => this.warehouseService.fetchWarehouses();

  private warehouse = (_root: unknown, { id }: GetWarehouseInput) =>
    this.warehouseService.fetchWarehouse(new FetchWarehouseRequest(id));
}
