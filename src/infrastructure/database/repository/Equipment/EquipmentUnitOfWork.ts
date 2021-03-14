import { inject, injectable } from 'inversify';

import { DOMAIN_REPOSITORY_IDENTIFIERS } from 'core/CoreModuleSymbols';

import { IEquipmentRepository } from 'core/domainServices/Equipment/IEquipmentRepository';
import { IUserRepository } from 'core/domainServices/User/IUserRepository';
import { IEquipmentUnitOfWork } from 'core/domainServices/Equipment/IEquipmentUnitOfWork';

import { AddEquipmentRepositoryRequest } from 'core/domainServices/Equipment/request/AddEquipmentRepositoryRequest';
import { AddEquipmentUnitOfWorkRepositoryRequest } from 'core/domainServices/Equipment/request/AddEquipmentUnitOfWorkRepositoryRequest';
import { FindUserRepositoryRequest } from 'core/domainServices/User/request/FindUserRepositoryRequest';
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
    width,
    height,
    depth,
  }: AddEquipmentUnitOfWorkRepositoryRequest): Promise<Equipment> {
    const { id } = await this.userRepository.findUser(
      new FindUserRepositoryRequest(userId)
    );

    return this.equipmentRepository.addEquipment(
      new AddEquipmentRepositoryRequest(name, width, height, depth, id)
    );
  }
}
