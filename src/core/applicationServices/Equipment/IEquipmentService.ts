import { CreateEquipmentRequest } from 'core/applicationServices/Equipment/requests/CreateEquipmentRequest';
import { Equipment } from 'core/domain/Equipment/Equipment';

export interface IEquipmentService {
  createEquipment(request: CreateEquipmentRequest): Promise<Equipment>;
}
