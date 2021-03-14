import { inject, injectable } from 'inversify';

import { IResolverObject } from 'apollo-server-express';

import { DOMAIN_APPLICATION_SERVICE_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { IWarehouseItemService } from 'core/applicationServices/WarehouseItem/IWarehouseItemService';
import { CreateWarehouseItemRequest } from 'core/applicationServices/WarehouseItem/requests/CreateWarehouseItemRequest';
import { UpdateWarehouseItemRequest } from 'core/applicationServices/WarehouseItem/requests/UpdateWarehouseItemRequest';
import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { UpdateWarehouseItemInput } from 'ui/Administration/WarehouseItem/graphql/inputs/UpdateWarehouseItemInput';
import { CreateWarehouseItemInput } from 'ui/Administration/WarehouseItem/graphql/inputs/CreateWarehouseItemInput';

@injectable()
export class WarehouseItemMutation implements IResolver<IResolverObject> {
  readonly resolvers: IResolverObject;

  constructor(
    @inject(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.WAREHOUSE_ITEM_SERVICE)
    private readonly warehouseItemService: IWarehouseItemService
  ) {
    this.resolvers = {
      createWarehouseItem: this.createWarehouseItem,
      updateWarehouseItem: this.updateWarehouseItem,
    };
  }

  private createWarehouseItem = (
    _root: unknown,
    {
      input: { cost, name, equipmentID, warehouseID },
    }: { input: CreateWarehouseItemInput }
  ) =>
    this.warehouseItemService.createWarehouseItem(
      new CreateWarehouseItemRequest(name, warehouseID, equipmentID, cost)
    );

  private updateWarehouseItem = (
    _root: unknown,
    {
      input: { id, cost, name, equipmentID, warehouseID },
    }: { input: UpdateWarehouseItemInput }
  ) =>
    this.warehouseItemService.updateWarehouseItem(
      new UpdateWarehouseItemRequest(id, name, cost, warehouseID, equipmentID)
    );
}
