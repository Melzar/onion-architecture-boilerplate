import { inject, injectable } from 'inversify';

import { DOMAIN_UNIT_OF_WORK_IDENTIFIERS } from 'core/CoreModuleSymbols';

import { IEquipmentUnitOfWork } from 'core/domainServices/Equipment/IEquipmentUnitOfWork';
import { IEquipmentService } from 'core/applicationServices/Equipment/IEquipmentService';
import { CreateEquipmentRequest } from 'core/applicationServices/Equipment/requests/CreateEquipmentRequest';
import { AddEquipmentUnitOfWorkRepositoryRequest } from 'core/domainServices/Equipment/request/AddEquipmentUnitOfWorkRepositoryRequest';
import { Equipment } from 'core/domain/Equipment/Equipment';

@injectable()
export class EquipmentService implements IEquipmentService {
  constructor(
    @inject(DOMAIN_UNIT_OF_WORK_IDENTIFIERS.EQUIPMENT_UNIT_OF_WORK)
    private readonly equipmentUnitOfWork: IEquipmentUnitOfWork
  ) {}

  async createEquipment({
    name,
    userId,
  }: CreateEquipmentRequest): Promise<Equipment> {
    return this.equipmentUnitOfWork.addEquipment(
      new AddEquipmentUnitOfWorkRepositoryRequest(name, userId)
    );
  }
}
