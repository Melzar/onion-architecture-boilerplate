import { inject, injectable } from 'inversify';

import { IResolverObject } from 'apollo-server-express';

import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { DOMAIN_APPLICATION_SERVICE_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { IWarehouseItemEquipmentService } from 'core/applicationServices/WarehouseItem/IWarehouseItemEquipmentService';
import { IWarehouseItemWarehouseService } from 'core/applicationServices/WarehouseItem/IWarehouseItemWarehouseService';
import { WarehouseItem } from 'core/domain/Warehouse/WarehouseItem';
import { FetchWarehouseItemEquipmentRequest } from 'core/applicationServices/WarehouseItem/requests/FetchWarehouseItemEquipmentRequest';
import { FetchWarehouseItemWarehouseRequest } from 'core/applicationServices/WarehouseItem/requests/FetchWarehouseItemWarehouseRequest';

@injectable()
export class WarehouseItemSubQuery implements IResolver<IResolverObject> {
  readonly resolvers: IResolverObject;

  constructor(
    @inject(
      DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.WAREHOUSE_ITEM_EQUIPMENT_SERVICE
    )
    private readonly warehouseItemEquipmentService: IWarehouseItemEquipmentService,
    @inject(
      DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.WAREHOUSE_ITEM_WAREHOUSE_SERVICE
    )
    private readonly warehouseItemWarehouseService: IWarehouseItemWarehouseService
  ) {
    this.resolvers = {
      WarehouseItem: {
        equipment: this.equipment,
        warehouse: this.warehouse,
      },
    };
  }

  private equipment = ({ id }: WarehouseItem) =>
    this.warehouseItemEquipmentService.fetchEquipment(
      new FetchWarehouseItemEquipmentRequest(id)
    );

  private warehouse = ({ id }: WarehouseItem) =>
    this.warehouseItemWarehouseService.fetchWarehouse(
      new FetchWarehouseItemWarehouseRequest(id)
    );
}
