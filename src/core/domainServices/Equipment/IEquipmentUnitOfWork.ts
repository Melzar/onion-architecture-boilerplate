import { AddEquipmentUnitOfWorkRepositoryRequest } from 'core/domainServices/Equipment/request/AddEquipmentUnitOfWorkRepositoryRequest';
import { Equipment } from 'core/domain/Equipment/Equipment';

export interface IEquipmentUnitOfWork {
  addEquipment(
    request: AddEquipmentUnitOfWorkRepositoryRequest
  ): Promise<Equipment>;
}
