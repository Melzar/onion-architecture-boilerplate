import { Equipment } from 'core/domain/Equipment/Equipment';
import { FindEquipmentRepositoryRequest } from 'core/domainServices/Equipment/request/FindEquipmentRepositoryRequest';
import { AddEquipmentRepositoryRequest } from 'core/domainServices/Equipment/request/AddEquipmentRepositoryRequest';

export interface IEquipmentRepository {
  addEquipment(request: AddEquipmentRepositoryRequest): Promise<Equipment>;
  getEquipment(): Promise<Equipment[]>;
  findEquipment(request: FindEquipmentRepositoryRequest): Promise<Equipment>;
}
