import { inject, injectable } from 'inversify';

import { DOMAIN_REPOSITORY_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { IUserEquipmentService } from 'core/applicationServices/User/IUserEquipmentService';
import { IEquipmentRepository } from 'core/domainServices/Equipment/IEquipmentRepository';
import { FetchUserEquipmentRequest } from 'core/applicationServices/User/requests/FetchUserEquipmentRequest';
import { Equipment } from 'core/domain/Equipment/Equipment';
import { FindEquipmentForUserRepositoryRequest } from 'core/domainServices/Equipment/request/FindEquipmentForUserRepositoryRequest';

@injectable()
export class UserEquipmentService implements IUserEquipmentService {
  constructor(
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.EQUIPMENT_REPOSITORY)
    private readonly equipmentRepository: IEquipmentRepository
  ) {}

  fetchUserEquipment({
    userId,
  }: FetchUserEquipmentRequest): Promise<Equipment[]> {
    return this.equipmentRepository.findEquipmentForUser(
      new FindEquipmentForUserRepositoryRequest(userId)
    );
  }
}
