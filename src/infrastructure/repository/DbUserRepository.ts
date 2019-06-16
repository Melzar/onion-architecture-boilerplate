import { inject, injectable } from 'inversify';

import { IUserRepository } from 'core/domainServices/IUserRepository';
import { User } from 'core/domain/User';
import { User as UserEntity } from 'infrastructure/db/entities/User';
import { DbRepository } from 'infrastructure/repository/DbRepository';
import { INFRASTRUCTURE_SYMBOLS } from 'dependency/infrastructure/InfrastructureModuleSymbols';
import { UserMapper } from 'infrastructure/common/mapper/UserMapper';


@injectable()
export class DbUserRepository extends DbRepository<UserEntity> implements IUserRepository {
  private readonly userMapper: UserMapper;

  constructor(@inject(INFRASTRUCTURE_SYMBOLS.USER_MAPPER) userMapper: UserMapper) {
    super();

    this.userMapper = userMapper;
  }

  async addUser(user: User): Promise<boolean> {
    return this.save(user); // TODO TRANSFORM TO ENTITY
  }

  async findUser(id: string): Promise<User | undefined> {
    const result = await this.find(id);

    let mappedResult;
    if (result) {
      mappedResult = this.userMapper.getMapper().map<UserEntity, User>(result);
    }

    return mappedResult;
  }

  async findUserByEmail(email: string): Promise<User[] | undefined> {
    const result = await this.findBy({ email });

    return this.userMapper.getMapper().mapArray<UserEntity, User>({
      source: Symbol('source'),
      destination: Symbol('destination'),
    }, result);
  }
}
