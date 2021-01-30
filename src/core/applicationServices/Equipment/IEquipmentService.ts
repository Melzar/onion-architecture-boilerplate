import { CreateEquipmentRequest } from 'core/applicationServices/Equipment/requests/CreateEquipmentRequest';
import { Equipment } from 'core/domain/Equipment/Equipment';
import { FetchEquipmentRequest } from 'core/applicationServices/Equipment/requests/FetchEquipmentRequest';

export interface IEquipmentService {
  createEquipment(request: CreateEquipmentRequest): Promise<Equipment>;
  fetchEquipment(request: FetchEquipmentRequest): Promise<Equipment>;
  fetchAllEquipment(): Promise<Equipment[]>;
}
