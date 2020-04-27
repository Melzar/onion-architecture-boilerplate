import { AddEquipmentUnitOfWorkRequest } from 'core/domainServices/Equipment/request/AddEquipmentUnitOfWorkRequest';
import { Equipment } from 'core/domain/Equipment/Equipment';

export interface IEquipmentUnitOfWork {
  addEquipment(request: AddEquipmentUnitOfWorkRequest): Promise<Equipment>;
}
