import { Equipment } from 'core/domain/Equipment/Equipment';
import { FindEquipmentRepositoryRequest } from 'core/domainServices/Equipment/request/FindEquipmentRepositoryRequest';
import { FindEquipmentForUserRepositoryRequest } from 'core/domainServices/Equipment/request/FindEquipmentForUserRepositoryRequest';
import { AddEquipmentRepositoryRequest } from 'core/domainServices/Equipment/request/AddEquipmentRepositoryRequest';

export interface IEquipmentRepository {
  addEquipment(request: AddEquipmentRepositoryRequest): Promise<Equipment>;
  getEquipment(): Promise<Equipment[]>;
  findEquipment(request: FindEquipmentRepositoryRequest): Promise<Equipment>;
  findEquipmentForUser(
    request: FindEquipmentForUserRepositoryRequest
  ): Promise<Equipment[]>; // TODO Candidate for extraction to separate repository
}
