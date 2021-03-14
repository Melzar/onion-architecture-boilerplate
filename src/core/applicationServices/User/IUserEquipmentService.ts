import { Equipment } from 'core/domain/Equipment/Equipment';
import { FetchUserEquipmentRequest } from 'core/applicationServices/User/requests/FetchUserEquipmentRequest';
import { CalculateUserEquipmentCostRequest } from 'core/applicationServices/User/requests/CalculateUserEquipmentCostRequest';
import { EquipmentCost } from 'core/domain/Equipment/EquipmentCost';

export interface IUserEquipmentService {
  fetchEquipment(request: FetchUserEquipmentRequest): Promise<Equipment[]>;
  calculateEquipmentCost(
    request: CalculateUserEquipmentCostRequest
  ): Promise<EquipmentCost>;
}
