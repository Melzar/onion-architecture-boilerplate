import { inject, injectable } from 'inversify';

import { IResolverObject } from 'apollo-server-express';

import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { DOMAIN_APPLICATION_SERVICE_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { IWarehouseService } from 'core/applicationServices/Warehouse/IWarehouseService';
import { IStateService } from 'core/applicationServices/State/IStateService';
import { IWarehouseWarehouseItemService } from 'core/applicationServices/Warehouse/IWarehouseWarehouseItemService';
import { Warehouse } from 'core/domain/Warehouse/Warehouse';
import { FetchStateRequest } from 'core/applicationServices/State/requests/FetchStateRequest';
import { FetchWarehouseItemsRequest } from 'core/applicationServices/WarehouseItem/requests/FetchWarehouseItemsRequest';

@injectable()
export class WarehouseSubQuery implements IResolver<IResolverObject> {
  readonly resolvers: IResolverObject;

  constructor(
    @inject(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.WAREHOUSE_SERVICE)
    private readonly warehouseService: IWarehouseService,
    @inject(
      DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.WAREHOUSE_WAREHOUSE_ITEM_SERVICE
    )
    private readonly warehouseWarehouseItemService: IWarehouseWarehouseItemService,
    @inject(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.STATE_SERVICE)
    private readonly stateService: IStateService
  ) {
    this.resolvers = {
      Warehouse: {
        state: this.state,
        warehouseItems: this.warehouseItems,
      },
    };
  }

  private state = ({ id }: Warehouse) =>
    this.stateService.fetchState(new FetchStateRequest(id));

  private warehouseItems = ({ id }: Warehouse) =>
    this.warehouseWarehouseItemService.fetchWarehouseItems(
      new FetchWarehouseItemsRequest(id)
    );
}
