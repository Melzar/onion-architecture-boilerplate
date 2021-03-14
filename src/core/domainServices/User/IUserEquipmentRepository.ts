import { GetUserEquipmentRepositoryRequest } from 'core/domainServices/User/request/GetUserEquipmentRepositoryRequest';
import { FindUserEquipmentRepositoryRequest } from 'core/domainServices/User/request/FindUserEquipmentRepositoryRequest';
import { Equipment } from 'core/domain/Equipment/Equipment';

export interface IUserEquipmentRepository {
  getEquipment(request: GetUserEquipmentRepositoryRequest): Promise<Equipment>;
  findEquipment(
    request: FindUserEquipmentRepositoryRequest
  ): Promise<Equipment[]>;
}
