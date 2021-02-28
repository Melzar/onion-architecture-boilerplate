import { inject, injectable } from 'inversify';

import { DOMAIN_REPOSITORY_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { IWarehouseItemEquipmentService } from 'core/applicationServices/WarehouseItem/IWarehouseItemEquipmentService';
import { IWarehouseItemEquipmentRepository } from 'core/domainServices/WarehouseItem/IWarehouseItemEquipmentRepository';
import { Equipment } from 'core/domain/Equipment/Equipment';
import { FetchWarehouseItemEquipmentRequest } from 'core/applicationServices/WarehouseItem/requests/FetchWarehouseItemEquipmentRequest';
import { GetWarehouseItemEquipmentRepositoryRequest } from 'core/domainServices/WarehouseItem/requests/GetWarehouseItemEquipmentRepositoryRequest';

@injectable()
export class WarehouseItemEquipmentService
  implements IWarehouseItemEquipmentService {
  constructor(
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.WAREHOUSE_ITEM_EQUIPMENT_REPOSITORY)
    private readonly warehouseItemEquipmentRepository: IWarehouseItemEquipmentRepository
  ) {}

  fetchEquipment({
    warehouseItemId,
  }: FetchWarehouseItemEquipmentRequest): Promise<Equipment> {
    return this.warehouseItemEquipmentRepository.getEquipment(
      new GetWarehouseItemEquipmentRepositoryRequest(warehouseItemId)
    );
  }
}
