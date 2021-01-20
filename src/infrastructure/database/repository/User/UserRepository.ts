import { inject, injectable } from 'inversify';

import { EntityRepository } from 'typeorm';

import { IUserRepository } from 'core/domainServices/User/IUserRepository';
import { User } from 'core/domain/User/User';
import { AddUserRepositoryRequest } from 'core/domainServices/User/request/AddUserRepositoryRequest';
import { FindUserRepositoryRequest } from 'core/domainServices/User/request/FindUserRepositoryRequest';
import { FindUserByEmailRepositoryRequest } from 'core/domainServices/User/request/FindUserByEmailRepositoryRequest';
import { BaseError } from 'core/common/errors/BaseError';
import { DOMAIN_MAPPING_IDENTIFIERS } from 'core/CoreModuleSymbols';

import { User as UserEntity } from 'infrastructure/database/entities/User';
import { DBMapper } from 'infrastructure/database/mappings/DBMapper';
import { Repository } from 'infrastructure/database/repository/common/Repository';
import { Role } from 'infrastructure/database/entities/Role';
import {
  DATABASE_MAPPING_IDENTIFIERS,
  INFRASTRUCTURE_IDENTIFIERS,
} from 'infrastructure/InfrastructureModuleSymbols';

import { InfrastructureErrors } from 'infrastructure/common/errors/InfrastructureErrors';

@injectable()
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>
  implements IUserRepository {
  constructor(
    @inject(INFRASTRUCTURE_IDENTIFIERS.DB_MAPPER)
    private readonly dbMapper: DBMapper
  ) {
    super(UserEntity);
  }

  async addUser({
    age,
    email,
    firstName,
    lastName,
    password,
    roleId,
  }: AddUserRepositoryRequest): Promise<User> {
    const user = new UserEntity();
    user.age = age;
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = password;

    const memberRole = new Role();
    memberRole.id = roleId;
    user.role = memberRole;

    const savedUser = await this.save(user);

    return this.dbMapper.mapper.map<UserEntity, User>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.USER_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.USER_ENTITY,
      },
      savedUser
    );
  }

  async findUser({ id }: FindUserRepositoryRequest): Promise<User> {
    const result = await this.custom()
      .createQueryBuilder()
      .leftJoinAndSelect('User.role', 'Role')
      .where('User.id = :id ', { id })
      .getOne();

    if (!result) {
      throw new BaseError(
        InfrastructureErrors[InfrastructureErrors.USER_NOT_FOUND]
      );
    }

    return this.dbMapper.mapper.map<UserEntity, User>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.USER_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.USER_ENTITY,
      },
      result
    );
  }

  async findUserByEmail({
    email,
  }: FindUserByEmailRepositoryRequest): Promise<User> {
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

  async getUsers(): Promise<User[]> {
    const users = await this.custom()
      .createQueryBuilder()
      .leftJoinAndSelect('User.role', 'role')
      .getMany();

    return this.dbMapper.mapper.map<UserEntity[], User[]>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.USER_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.USER_ENTITY,
      },
      users
    );
  }
}
