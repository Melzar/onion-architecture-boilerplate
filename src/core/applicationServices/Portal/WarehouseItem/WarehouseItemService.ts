import { inject, injectable } from 'inversify';

import {
  DOMAIN_INTERACTORS_IDENTIFIERS,
  DOMAIN_REPOSITORY_IDENTIFIERS,
} from 'core/CoreModuleSymbols';
import { IWarehouseItemService } from 'core/applicationServices/Portal/WarehouseItem/IWarehouseItemService';
import { IInteractor } from 'core/applicationServices/common/IInteractor';
import { CalculateEquipmentCostInteractorRequest } from 'core/applicationServices/common/Equipment/interactors/requests/CalculateEquipmentCostInteractorRequest';
import { AddWarehouseItemRequest } from 'core/applicationServices/Portal/WarehouseItem/requests/AddWarehouseItemRequest';
import { IWarehouseItemRepository } from 'core/domainServices/Portal/WarehouseItem/IWarehouseItemRepository';
import { AddWarehouseItemRepositoryRequest } from 'core/domainServices/Portal/WarehouseItem/requests/AddWarehouseItemRepositoryRequest';
import { WarehouseItem } from 'core/domain/Warehouse/WarehouseItem';
import { EquipmentCost } from 'core/domain/Equipment/EquipmentCost';

@injectable()
export class WarehouseItemService implements IWarehouseItemService {
  constructor(
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.PORTAL_WAREHOUSE_ITEM_REPOSITORY)
    private readonly warehouseItemRepository: IWarehouseItemRepository,
    @inject(DOMAIN_INTERACTORS_IDENTIFIERS.CALCULATE_EQUIPMENT_COST_INTERACTOR)
    private readonly calculateEquipmentCostInteractor: IInteractor<
      CalculateEquipmentCostInteractorRequest,
      EquipmentCost
    >
  ) {}

  async addWarehouseItem({
    equipmentID,
    warehouseID,
    name,
  }: AddWarehouseItemRequest): Promise<WarehouseItem> {
    const { cost } = await this.calculateEquipmentCostInteractor.execute(
      new CalculateEquipmentCostInteractorRequest(warehouseID, equipmentID)
    );

    return this.warehouseItemRepository.addWarehouseItem(
      new AddWarehouseItemRepositoryRequest(
        equipmentID,
        warehouseID,
        cost,
        name
      )
    );
  }
}
