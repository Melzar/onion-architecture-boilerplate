import { inject, injectable } from 'inversify';

import { EntityRepository } from 'typeorm';

import { IUserRepository } from 'core/domainServices/User/IUserRepository';
import { User } from 'core/domain/User/User';
import { AddUserRequest } from 'core/domainServices/User/request/AddUserRequest';
import { FindUserRequest } from 'core/domainServices/User/request/FindUserRequest';
import { FindUserByEmailRequest } from 'core/domainServices/User/request/FindUserByEmailRequest';
import { FindRoleByNameRequest } from 'core/domainServices/Role/request/FindRoleByNameRequest';
import { IRoleRepository } from 'core/domainServices/Role/IRoleRepository';
import { IEquipmentRepository } from 'core/domainServices/Equipment/IEquipmentRepository';
import {
  DOMAIN_MAPPING_IDENTIFIERS,
  DOMAIN_REPOSITORY_IDENTIFIERS,
} from 'core/CoreModuleSymbols';

import { User as UserEntity } from 'infrastructure/db/entities/User';
import { DBMapper } from 'infrastructure/db/mappings/DBMapper';

import { DbRepository } from 'infrastructure/repository/DbRepository';
import {
  DATABASE_MAPPING_IDENTIFIERS,
  INFRASTRUCTURE_IDENTIFIERS,
} from 'infrastructure/InfrastructureModuleSymbols';
import { USER_ROLE } from 'infrastructure/db/enum/UserRole';
import { DeleteUserRequest } from 'core/domainServices/User/request/DeleteUserRequest';
import { FindEquipmentForUserRequest } from 'core/domainServices/Equipment/request/FindEquipmentForUserRequest';
import { Role } from 'infrastructure/db/entities/Role';

@injectable()
@EntityRepository(UserEntity)
export class DbUserRepository extends DbRepository<UserEntity>
  implements IUserRepository {
  constructor(
    @inject(INFRASTRUCTURE_IDENTIFIERS.DB_MAPPER)
    private readonly dbMapper: DBMapper,
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.EQUIPMENT_REPOSITORY)
    private readonly equipmentRepository: IEquipmentRepository
  ) {
    super(UserEntity);
  }

  async addUser({
    age,
    email,
    firstName,
    lastName,
    password,
  }: AddUserRequest): Promise<void> {
    const role = await this.roleRepository.findRoleByName(
      new FindRoleByNameRequest(USER_ROLE.MEMBER)
    );

    if (!role) {
      // TODO APPLY ERROR HANDLING
      return;
    }

    const user = new UserEntity();
    user.age = age;
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = password;

    const memberRole = new Role();
    memberRole.id = +role.id;
    user.role = memberRole;

    this.save(user);
  }

  async findUser({ id }: FindUserRequest): Promise<User | undefined> {
    const result = await this.find(id);

    let mappedResult;
    if (result) {
      mappedResult = this.dbMapper.mapper.map<UserEntity, User>(
        {
          destination: DOMAIN_MAPPING_IDENTIFIERS.USER_DOMAIN,
          source: DATABASE_MAPPING_IDENTIFIERS.USER_ENTITY,
        },
        result
      );
    }

    return mappedResult;
  }

  async findUserByEmail({ email }: FindUserByEmailRequest): Promise<User> {
    const result = await this.custom()
      .createQueryBuilder()
      .leftJoinAndSelect('User.role', 'role')
      .where('User.email = :email', { email })
      .getMany();

    return this.dbMapper.mapper.map<UserEntity, User>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.USER_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.USER_ENTITY,
      },
      result[0]
    );
  }

  async deleteUser({ id }: DeleteUserRequest): Promise<void> {
    const user = await this.find(id);

    // TODO APPLY ERROR HANDLING
    if (!user) {
      return;
    }

    const userEquipment = await this.equipmentRepository.findEquipmentForUser(
      new FindEquipmentForUserRequest(id)
    );

    // https://github.com/typeorm/typeorm/blob/master/docs/transactions.md
    await this.custom().manager.transaction(
      async transactionalEntityManager => {
        await transactionalEntityManager.remove(userEquipment);
        await transactionalEntityManager.remove(user);
      }
    );
  }
}
