import { inject, injectable } from 'inversify';

import { IResolverObject } from 'apollo-server-express';

import { DOMAIN_APPLICATION_SERVICE_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { IWarehouseItemService } from 'core/applicationServices/WarehouseItem/IWarehouseItemService';
import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { GetWarehouseInput } from 'ui/Administration/Warehouse/graphql/inputs/GetWarehouseInput';
import { FetchWarehouseItemRequest } from 'core/applicationServices/WarehouseItem/requests/FetchWarehouseItemRequest';

@injectable()
export class WarehouseItemQuery implements IResolver<IResolverObject> {
  readonly resolvers: IResolverObject;

  constructor(
    @inject(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.WAREHOUSE_ITEM_SERVICE)
    private readonly warehouseItemService: IWarehouseItemService
  ) {
    this.resolvers = {
      warehouseItem: this.warehouseItem,
      warehouseItems: this.warehouseItems,
    };
  }

  private warehouseItem = (_root: unknown, { id }: GetWarehouseInput) =>
    this.warehouseItemService.fetchWarehouseItem(
      new FetchWarehouseItemRequest(id)
    );

  private warehouseItems = () =>
    this.warehouseItemService.fetchWarehouseItems();
}
