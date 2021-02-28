import { inject, injectable } from 'inversify';

import { IResolverObject } from 'apollo-server-express';

import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { DOMAIN_APPLICATION_SERVICE_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { IWarehouseItemService } from 'core/applicationServices/Portal/WarehouseItem/IWarehouseItemService';
import { AddWarehouseItemInput } from 'ui/Portal/WarehouseItem/graphql/inputs/AddWarehouseItemInput';
import { AddWarehouseItemRequest } from 'core/applicationServices/Portal/WarehouseItem/requests/AddWarehouseItemRequest';

@injectable()
export class WarehouseItemMutation implements IResolver<IResolverObject> {
  readonly resolvers: IResolverObject;

  constructor(
    @inject(
      DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.PORTAL_WAREHOUSE_ITEM_SERVICE
    )
    private readonly warehouseItemService: IWarehouseItemService
  ) {
    this.resolvers = {
      addWarehouseItem: this.addWarehouseItem,
    };
  }

  private addWarehouseItem = (
    _root: unknown,
    {
      input: { equipmentID, warehouseID, name },
    }: { input: AddWarehouseItemInput }
  ) =>
    this.warehouseItemService.addWarehouseItem(
      new AddWarehouseItemRequest(equipmentID, warehouseID, name)
    );
}
