import { inject, injectable } from 'inversify';

import { Transactional } from 'typeorm-transactional-cls-hooked';

import { DOMAIN_REPOSITORY_IDENTIFIERS } from 'core/CoreModuleSymbols';

import { IUserUnitOfWork } from 'core/domainServices/User/IUserUnitOfWork';
import { IEquipmentRepository } from 'core/domainServices/Equipment/IEquipmentRepository';
import { IUserRepository } from 'core/domainServices/User/IUserRepository';
import { IRoleRepository } from 'core/domainServices/Role/IRoleRepository';

import { User } from 'core/domain/User/User';

import { UnitOfWork } from 'infrastructure/database/repository/common/UnitOfWork';
import { USER_ROLE } from 'infrastructure/database/enum/UserRole';
import { Equipment } from 'infrastructure/database/entities/Equipment';
import { User as UserEntity } from 'infrastructure/database/entities/User';

import { AddUserRequest } from 'core/domainServices/User/request/AddUserRequest';
import { FindUserRequest } from 'core/domainServices/User/request/FindUserRequest';
import { FindEquipmentForUserRequest } from 'core/domainServices/Equipment/request/FindEquipmentForUserRequest';
import { FindRoleByNameRequest } from 'core/domainServices/Role/request/FindRoleByNameRequest';
import { AddUserUnitOfWorkRequest } from 'core/domainServices/User/request/AddUserUnitOfWorkRequest';
import { DeleteUserUnitOfWorkRequest } from 'core/domainServices/User/request/DeleteUserUnitOfWorkRequest';

@injectable()
export class UserUnitOfWork extends UnitOfWork implements IUserUnitOfWork {
  constructor(
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.EQUIPMENT_REPOSITORY)
    private readonly equipmentRepository: IEquipmentRepository,
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
  }: AddUserUnitOfWorkRequest): Promise<User> {
    const { id } = await this.roleRepository.findRoleByName(
      new FindRoleByNameRequest(USER_ROLE.MEMBER)
    );

    return this.userRepository.addUser(
      new AddUserRequest(firstName, email, lastName, password, age, +id)
    );
  }

  @Transactional({
    connectionName: () => process.env.ORM_CONNECTION,
  })
  async deleteUser({ id }: DeleteUserUnitOfWorkRequest): Promise<void> {
    const equipment = await this.equipmentRepository.findEquipmentForUser(
      new FindEquipmentForUserRequest(id)
    );

    const user = await this.userRepository.findUser(new FindUserRequest(id));

    await this.getManager<Equipment>(Equipment).remove(equipment);
    await this.getManager<UserEntity>(UserEntity).remove(user);
  }
}
