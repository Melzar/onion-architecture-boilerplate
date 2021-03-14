import { inject, injectable } from 'inversify';

import { Transactional } from 'typeorm-transactional-cls-hooked';

import { DOMAIN_REPOSITORY_IDENTIFIERS } from 'core/CoreModuleSymbols';

import { IUserUnitOfWork } from 'core/domainServices/User/IUserUnitOfWork';
import { IUserRepository } from 'core/domainServices/User/IUserRepository';
import { IRoleRepository } from 'core/domainServices/Role/IRoleRepository';
import { IUserEquipmentRepository } from 'core/domainServices/User/IUserEquipmentRepository';

import { User } from 'core/domain/User/User';

import { UnitOfWork } from 'infrastructure/database/repository/common/UnitOfWork';
import { USER_ROLE } from 'infrastructure/database/enum/UserRole';
import { Equipment } from 'infrastructure/database/entities/Equipment';
import { User as UserEntity } from 'infrastructure/database/entities/User';

import { AddUserRepositoryRequest } from 'core/domainServices/User/request/AddUserRepositoryRequest';
import { FindUserRepositoryRequest } from 'core/domainServices/User/request/FindUserRepositoryRequest';
import { FindUserEquipmentRepositoryRequest } from 'core/domainServices/User/request/FindUserEquipmentRepositoryRequest';
import { FindRoleByNameRepositoryRequest } from 'core/domainServices/Role/request/FindRoleByNameRepositoryRequest';
import { AddUserUnitOfWorkRepositoryRequest } from 'core/domainServices/User/request/AddUserUnitOfWorkRepositoryRequest';
import { DeleteUserUnitOfWorkRepositoryRequest } from 'core/domainServices/User/request/DeleteUserUnitOfWorkRepositoryRequest';

@injectable()
export class UserUnitOfWork extends UnitOfWork implements IUserUnitOfWork {
  constructor(
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.USER_EQUIPMENT_REPOSITORY)
    private readonly userEquipmentRepository: IUserEquipmentRepository,
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository
  ) {
    super();
  }

  async addUser({
    email,
    password,
    firstName,
    lastName,
    age,
  }: AddUserUnitOfWorkRepositoryRequest): Promise<User> {
    const { id } = await this.roleRepository.findRoleByName(
      new FindRoleByNameRepositoryRequest(USER_ROLE.MEMBER)
    );

    return this.userRepository.addUser(
      new AddUserRepositoryRequest(
        firstName,
        email,
        lastName,
        password,
        age,
        +id
      )
    );
  }

  @Transactional({
    connectionName: () => process.env.ORM_CONNECTION,
  })
  async deleteUser({
    id,
  }: DeleteUserUnitOfWorkRepositoryRequest): Promise<void> {
    const equipment = await this.userEquipmentRepository.findEquipment(
      new FindUserEquipmentRepositoryRequest(id)
    );

    const user = await this.userRepository.findUser(
      new FindUserRepositoryRequest(id)
    );

    await this.getManager<Equipment>(Equipment).remove(equipment); // TODO make it soft delete
    await this.getManager<UserEntity>(UserEntity).remove(user); // TODO make it soft delete
  }
}
