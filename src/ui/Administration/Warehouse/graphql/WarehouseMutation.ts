import { inject, injectable } from 'inversify';

import { IResolverObject } from 'apollo-server-express';

import { DOMAIN_APPLICATION_SERVICE_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { IWarehouseService } from 'core/applicationServices/Warehouse/IWarehouseService';
import { CreateWarehouseRequest } from 'core/applicationServices/Warehouse/requests/CreateWarehouseRequest';
import { UpdateWarehouseRequest } from 'core/applicationServices/Warehouse/requests/UpdateWarehouseRequest';
import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { CreateWarehouseInput } from 'ui/Administration/Warehouse/graphql/inputs/CreateWarehouseInput';
import { UpdateWarehouseInput } from 'ui/Administration/Warehouse/graphql/inputs/UpdateWarehouseInput';

@injectable()
export class WarehouseMutation implements IResolver<IResolverObject> {
  readonly resolvers: IResolverObject;

  constructor(
    @inject(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.WAREHOUSE_SERVICE)
    private readonly warehouseService: IWarehouseService
  ) {
    this.resolvers = {
      createWarehouse: this.createWarehouse,
      updateWarehouse: this.updateWarehouse,
    };
  }

  private createWarehouse = (
    _root: unknown,
    { input: { name, stateID } }: { input: CreateWarehouseInput }
  ) =>
    this.warehouseService.createWarehouse(
      new CreateWarehouseRequest(name, stateID)
    );

  private updateWarehouse = (
    _root: unknown,
    { input: { warehouseID, stateID, name } }: { input: UpdateWarehouseInput }
  ) =>
    this.warehouseService.updateWarehouse(
      new UpdateWarehouseRequest(warehouseID, stateID, name)
    );
}
