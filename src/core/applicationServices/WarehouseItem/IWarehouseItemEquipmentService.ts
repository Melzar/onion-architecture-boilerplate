import { Equipment } from 'core/domain/Equipment/Equipment';
import { FetchWarehouseItemEquipmentRequest } from 'core/applicationServices/WarehouseItem/requests/FetchWarehouseItemEquipmentRequest';

export interface IWarehouseItemEquipmentService {
  fetchEquipment(
    request: FetchWarehouseItemEquipmentRequest
  ): Promise<Equipment>;
}
