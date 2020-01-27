import { inject, injectable } from 'inversify';

import { EntityRepository } from 'typeorm';

import { IUserRepository } from 'core/domainServices/IUserRepository';
import { User } from 'core/domain/User';

import { User as UserEntity } from 'infrastructure/db/entities/User';
import { DBMapper } from 'infrastructure/db/mappings/DBMapper';

import { DbRepository } from 'infrastructure/repository/DbRepository';
import { DATABASE_MAPPING_IDENTIFIERS, INFRASTRUCTURE_SYMBOLS } from 'infrastructure/InfrastructureModuleSymbols';

@injectable()
@EntityRepository(UserEntity)
export class DbUserRepository extends DbRepository<UserEntity> implements IUserRepository {
  constructor(@inject(INFRASTRUCTURE_SYMBOLS.DB_MAPPER) private readonly dbMapper: DBMapper) {
    super(UserEntity);
  }

  async addUser(user: User): Promise<boolean> {
    return !!user;
    // return this.save(user); // TODO TRANSFORM TO ENTITY, temporary commented out
  }

  async findUser(id: string): Promise<User | undefined> {
    const result = await this.find(id);

    let mappedResult;
    if (result) {
      mappedResult = this.dbMapper.mapper.map<UserEntity, User>({
        source: DATABASE_MAPPING_IDENTIFIERS.USER_ENTITY,
        destination: DATABASE_MAPPING_IDENTIFIERS.USER_DOMAIN,
      }, result);
    }

    return mappedResult;
  }

  async findUserByEmail(email: string): Promise<User> {
    const result = await this.custom()
      .createQueryBuilder()
      .leftJoinAndSelect('User.role', 'role')
      .where('User.email = :email', { email })
      .getMany();

    return this.dbMapper.mapper.map<UserEntity, User>({
      source: DATABASE_MAPPING_IDENTIFIERS.USER_ENTITY,
      destination: DATABASE_MAPPING_IDENTIFIERS.USER_DOMAIN,
    }, result[0]);
  }
}
