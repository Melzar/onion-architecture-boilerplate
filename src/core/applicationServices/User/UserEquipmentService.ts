import { inject, injectable } from 'inversify';

import {
  DOMAIN_INTERACTORS_IDENTIFIERS,
  DOMAIN_REPOSITORY_IDENTIFIERS,
} from 'core/CoreModuleSymbols';
import { IInteractor } from 'core/applicationServices/common/IInteractor';
import { IUserEquipmentService } from 'core/applicationServices/User/IUserEquipmentService';
import { FetchUserEquipmentRequest } from 'core/applicationServices/User/requests/FetchUserEquipmentRequest';
import { Equipment } from 'core/domain/Equipment/Equipment';
import { FindUserEquipmentRepositoryRequest } from 'core/domainServices/User/request/FindUserEquipmentRepositoryRequest';
import { CalculateUserEquipmentCostRequest } from 'core/applicationServices/User/requests/CalculateUserEquipmentCostRequest';
import { CalculateEquipmentCostInteractorRequest } from 'core/applicationServices/common/Equipment/interactors/requests/CalculateEquipmentCostInteractorRequest';
import { GetUserEquipmentRepositoryRequest } from 'core/domainServices/User/request/GetUserEquipmentRepositoryRequest';
import { IUserEquipmentRepository } from 'core/domainServices/User/IUserEquipmentRepository';
import { EquipmentCost } from 'core/domain/Equipment/EquipmentCost';

@injectable()
export class UserEquipmentService implements IUserEquipmentService {
  constructor(
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.USER_EQUIPMENT_REPOSITORY)
    private readonly userEquipmentRepository: IUserEquipmentRepository,
    @inject(DOMAIN_INTERACTORS_IDENTIFIERS.CALCULATE_EQUIPMENT_COST_INTERACTOR)
    private readonly calculateEquipmentCostInteractor: IInteractor<
      CalculateEquipmentCostInteractorRequest,
      EquipmentCost
    >
  ) {}

  fetchEquipment({ userId }: FetchUserEquipmentRequest): Promise<Equipment[]> {
    return this.userEquipmentRepository.findEquipment(
      new FindUserEquipmentRepositoryRequest(userId)
    );
  }

  async calculateEquipmentCost({
    warehouseId,
    equipmentId,
    userId,
  }: CalculateUserEquipmentCostRequest) {
    await this.userEquipmentRepository.getEquipment(
      new GetUserEquipmentRepositoryRequest(userId, equipmentId)
    );

    return this.calculateEquipmentCostInteractor.execute(
      new CalculateEquipmentCostInteractorRequest(warehouseId, equipmentId)
    );
  }
}
