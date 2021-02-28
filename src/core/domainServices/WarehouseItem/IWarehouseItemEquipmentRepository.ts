import { GetWarehouseItemEquipmentRepositoryRequest } from 'core/domainServices/WarehouseItem/requests/GetWarehouseItemEquipmentRepositoryRequest';
import { Equipment } from 'core/domain/Equipment/Equipment';

export interface IWarehouseItemEquipmentRepository {
  getEquipment(
    request: GetWarehouseItemEquipmentRepositoryRequest
  ): Promise<Equipment>;
}
