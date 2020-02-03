import { CreateEquipmentRequest } from 'core/applicationServices/Equipment/requests/CreateEquipmentRequest';

export interface IEquipmentService {
  createEquipment(request: CreateEquipmentRequest): Promise<void>;
}
