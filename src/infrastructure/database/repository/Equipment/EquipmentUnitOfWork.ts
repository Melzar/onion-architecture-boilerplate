import { inject, injectable } from 'inversify';

import { DOMAIN_REPOSITORY_IDENTIFIERS } from 'core/CoreModuleSymbols';

import { IEquipmentRepository } from 'core/domainServices/Equipment/IEquipmentRepository';
import { IUserRepository } from 'core/domainServices/User/IUserRepository';
import { IEquipmentUnitOfWork } from 'core/domainServices/Equipment/IEquipmentUnitOfWork';

import { AddEquipmentRequest } from 'core/domainServices/Equipment/request/AddEquipmentRequest';
import { AddEquipmentUnitOfWorkRequest } from 'core/domainServices/Equipment/request/AddEquipmentUnitOfWorkRequest';
import { FindUserRequest } from 'core/domainServices/User/request/FindUserRequest';
import { Equipment } from 'core/domain/Equipment/Equipment';

import { UnitOfWork } from 'infrastructure/database/repository/common/UnitOfWork';

@injectable()
export class EquipmentUnitOfWork extends UnitOfWork
  implements IEquipmentUnitOfWork {
  constructor(
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.EQUIPMENT_REPOSITORY)
    private readonly equipmentRepository: IEquipmentRepository,
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.USER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {
    super();
  }

  async addEquipment({
    userId,
    name,
  }: AddEquipmentUnitOfWorkRequest): Promise<Equipment> {
    const { id } = await this.userRepository.findUser(
      new FindUserRequest(userId)
    );

    return this.equipmentRepository.addEquipment(
      new AddEquipmentRequest(name, id)
    );
  }
}
