import { Equipment } from 'core/domain/Equipment/Equipment';
import { FetchUserEquipmentRequest } from 'core/applicationServices/User/requests/FetchUserEquipmentRequest';

export interface IUserEquipmentService {
  fetchUserEquipment: (
    request: FetchUserEquipmentRequest
  ) => Promise<Equipment[]>;
}
