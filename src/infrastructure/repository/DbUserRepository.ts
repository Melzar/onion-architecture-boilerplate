import { injectable } from 'inversify';

import { IUserRepository } from 'core/domainServices/IUserRepository';
import { User } from 'core/domain/User';
import { User as UserEntity } from 'infrastructure/db/entities/User';
import { infrastructureMapper } from 'infrastructure/common/mapper/InfrastructureMapper';
import { DbRepository } from 'infrastructure/repository/DbRepository';


@injectable()
export class DbUserRepository extends DbRepository<UserEntity> implements IUserRepository {
  async addUser(user: User): Promise<boolean> {
    return this.save(user); // TODO TRANSFORM TO ENTITY
  }

  async findUser(id: string): Promise<User | undefined> {
    const result = await this.find(id);

    let mappedResult;
    if (result) {
      mappedResult = infrastructureMapper.getMapper().map<UserEntity, User>(result);
    }

    return mappedResult;
  }

  async findUserByEmail(email: string): Promise<User[] | undefined> {
    const result = await this.findBy({ email });

    const mappedResult = infrastructureMapper.getMapper().mapArray<UserEntity, User>({
      source: Symbol('source'),
      destination: Symbol('destination'),
    }, result);

    return mappedResult;
  }
}
