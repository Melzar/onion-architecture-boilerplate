import { inject, injectable } from 'inversify';

import { DOMAIN_REPOSITORY_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { IEquipmentRepository } from 'core/domainServices/Equipment/IEquipmentRepository';
import { IEquipmentService } from 'core/applicationServices/Equipment/IEquipmentService';
import { CreateEquipmentRequest } from 'core/applicationServices/Equipment/requests/CreateEquipmentRequest';
import { AddEquipmentRequest } from 'core/domainServices/Equipment/request/AddEquipmentRequest';

@injectable()
export class EquipmentService implements IEquipmentService {
  constructor(
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.EQUIPMENT_REPOSITORY)
    private readonly equipmentRepository: IEquipmentRepository
  ) {}

  async createEquipment({
    name,
    userId,
  }: CreateEquipmentRequest): Promise<void> {
    return this.equipmentRepository.addEquipment(
      new AddEquipmentRequest(name, userId)
    );
  }
}
