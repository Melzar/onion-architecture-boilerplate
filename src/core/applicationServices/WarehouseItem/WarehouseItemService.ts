import { inject, injectable } from 'inversify';

import {
  DOMAIN_INTERACTORS_IDENTIFIERS,
  DOMAIN_REPOSITORY_IDENTIFIERS,
} from 'core/CoreModuleSymbols';
import { IWarehouseItemRepository } from 'core/domainServices/WarehouseItem/IWarehouseItemRepository';
import { IWarehouseItemService } from 'core/applicationServices/WarehouseItem/IWarehouseItemService';
import { FetchWarehouseItemRequest } from 'core/applicationServices/WarehouseItem/requests/FetchWarehouseItemRequest';
import { WarehouseItem } from 'core/domain/Warehouse/WarehouseItem';
import { CreateWarehouseItemRequest } from 'core/applicationServices/WarehouseItem/requests/CreateWarehouseItemRequest';
import { UpdateWarehouseItemRequest } from 'core/applicationServices/WarehouseItem/requests/UpdateWarehouseItemRequest';
import { CreateWarehouseItemRepositoryRequest } from 'core/domainServices/WarehouseItem/requests/CreateWarehouseItemRepositoryRequest';
import { UpdateWarehouseItemRepositoryRequest } from 'core/domainServices/WarehouseItem/requests/UpdateWarehouseItemRepositoryRequest';
import { IInteractor } from 'core/applicationServices/common/IInteractor';
import { CalculateEquipmentCostInteractorRequest } from 'core/applicationServices/common/Equipment/interactors/requests/CalculateEquipmentCostInteractorRequest';
import { EquipmentCost } from 'core/domain/Equipment/EquipmentCost';

@injectable()
export class WarehouseItemService implements IWarehouseItemService {
  constructor(
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.WAREHOUSE_ITEM_REPOSITORY)
    private readonly warehouseItemRepository: IWarehouseItemRepository,
    @inject(DOMAIN_INTERACTORS_IDENTIFIERS.CALCULATE_EQUIPMENT_COST_INTERACTOR)
    private readonly calculateEquipmentCostInteractor: IInteractor<
      CalculateEquipmentCostInteractorRequest,
      EquipmentCost
    >
  ) {}

  fetchWarehouseItem({
    id,
  }: FetchWarehouseItemRequest): Promise<WarehouseItem> {
    return this.warehouseItemRepository.getWarehouseItem(
      new FetchWarehouseItemRequest(id)
    );
  }

  fetchWarehouseItems(): Promise<WarehouseItem[]> {
    return this.warehouseItemRepository.getWarehouseItems();
  }

  async createWarehouseItem({
    name,
    cost,
    warehouseID,
    equipmentID,
  }: CreateWarehouseItemRequest): Promise<WarehouseItem> {
    let warehouseItemCost = cost || 0;
    if (!cost) {
      warehouseItemCost = (
        await this.calculateEquipmentCostInteractor.execute(
          new CalculateEquipmentCostInteractorRequest(warehouseID, equipmentID)
        )
      ).cost;
    }

    return this.warehouseItemRepository.createWarehouseItem(
      new CreateWarehouseItemRepositoryRequest(
        name,
        warehouseItemCost,
        warehouseID,
        equipmentID
      )
    );
  }

  updateWarehouseItem({
    id,
    name,
    cost,
    equipmentID,
    warehouseID,
  }: UpdateWarehouseItemRequest): Promise<WarehouseItem> {
    return this.warehouseItemRepository.updateWarehouseItem(
      new UpdateWarehouseItemRepositoryRequest(
        id,
        name,
        cost,
        warehouseID,
        equipmentID
      )
    );
  }
}
