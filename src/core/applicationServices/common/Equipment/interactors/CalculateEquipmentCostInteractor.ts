import { inject, injectable } from 'inversify';

import { IInteractor } from 'core/applicationServices/common/IInteractor';
import { IWarehouseRepository } from 'core/domainServices/Warehouse/IWarehouseRepository';
import { IEquipmentRepository } from 'core/domainServices/Equipment/IEquipmentRepository';
import { IWarehouseStateRepository } from 'core/domainServices/Warehouse/IWarehouseStateRepository';
import { GetWarehouseRepositoryRequest } from 'core/domainServices/Warehouse/request/GetWarehouseRepositoryRequest';
import { FindEquipmentRepositoryRequest } from 'core/domainServices/Equipment/request/FindEquipmentRepositoryRequest';
import { GetWarehouseStateRepositoryRequest } from 'core/domainServices/Warehouse/request/GetWarehouseStateRepositoryRequest';
import { CalculateEquipmentCostInteractorRequest } from 'core/applicationServices/common/Equipment/interactors/requests/CalculateEquipmentCostInteractorRequest';
import { EquipmentCost } from 'core/domain/Equipment/EquipmentCost';
import { DOMAIN_REPOSITORY_IDENTIFIERS } from 'core/CoreModuleSymbols';

@injectable()
export class CalculateEquipmentCostInteractor
  implements
    IInteractor<CalculateEquipmentCostInteractorRequest, EquipmentCost> {
  constructor(
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.WAREHOUSE_REPOSITORY)
    public readonly warehouseRepository: IWarehouseRepository,
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.WAREHOUSE_STATE_REPOSITORY)
    public readonly warehouseStateRepository: IWarehouseStateRepository,
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.EQUIPMENT_REPOSITORY)
    public readonly equipmentRepository: IEquipmentRepository
  ) {}

  async execute({
    warehouseId,
    equipmentId,
  }: CalculateEquipmentCostInteractorRequest): Promise<EquipmentCost> {
    const warehouse = await this.warehouseRepository.getWarehouse(
      new GetWarehouseRepositoryRequest(warehouseId)
    );
    const equipment = await this.equipmentRepository.findEquipment(
      new FindEquipmentRepositoryRequest(equipmentId)
    );
    const state = await this.warehouseStateRepository.getState(
      new GetWarehouseStateRepositoryRequest(warehouseId)
    );

    const stateRate = state.rates.length ? state.rates[0].value : 1;

    return new EquipmentCost(
      warehouse.widthCost *
        (equipment.width / 100) *
        (warehouse.heightCost * (equipment.height / 100)) *
        (warehouse.depthCost * (equipment.depth / 100)) *
        stateRate
    );
  }
}
