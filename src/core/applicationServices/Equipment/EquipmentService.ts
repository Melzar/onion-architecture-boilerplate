import { inject, injectable } from 'inversify';

import {
  DOMAIN_REPOSITORY_IDENTIFIERS,
  DOMAIN_UNIT_OF_WORK_IDENTIFIERS,
} from 'core/CoreModuleSymbols';

import { IEquipmentUnitOfWork } from 'core/domainServices/Equipment/IEquipmentUnitOfWork';
import { IEquipmentService } from 'core/applicationServices/Equipment/IEquipmentService';
import { CreateEquipmentRequest } from 'core/applicationServices/Equipment/requests/CreateEquipmentRequest';
import { AddEquipmentUnitOfWorkRepositoryRequest } from 'core/domainServices/Equipment/request/AddEquipmentUnitOfWorkRepositoryRequest';
import { Equipment } from 'core/domain/Equipment/Equipment';
import { FetchEquipmentRequest } from 'core/applicationServices/Equipment/requests/FetchEquipmentRequest';
import { IEquipmentRepository } from 'core/domainServices/Equipment/IEquipmentRepository';
import { FindEquipmentRepositoryRequest } from 'core/domainServices/Equipment/request/FindEquipmentRepositoryRequest';

@injectable()
export class EquipmentService implements IEquipmentService {
  constructor(
    @inject(DOMAIN_UNIT_OF_WORK_IDENTIFIERS.EQUIPMENT_UNIT_OF_WORK)
    private readonly equipmentUnitOfWork: IEquipmentUnitOfWork,
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.EQUIPMENT_REPOSITORY)
    private readonly equipmentRepository: IEquipmentRepository
  ) {}

  async createEquipment({
    name,
    width,
    height,
    depth,
    userId,
  }: CreateEquipmentRequest): Promise<Equipment> {
    return this.equipmentUnitOfWork.addEquipment(
      new AddEquipmentUnitOfWorkRepositoryRequest(
        name,
        width,
        height,
        depth,
        userId
      )
    );
  }

  fetchEquipment({ id }: FetchEquipmentRequest): Promise<Equipment> {
    return this.equipmentRepository.findEquipment(
      new FindEquipmentRepositoryRequest(id)
    );
  }

  fetchAllEquipment(): Promise<Equipment[]> {
    return this.equipmentRepository.getEquipment();
  }
}
