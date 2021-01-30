import { inject, injectable } from 'inversify';

import {
  DOMAIN_REPOSITORY_IDENTIFIERS,
  DOMAIN_UNIT_OF_WORK_IDENTIFIERS,
} from 'core/CoreModuleSymbols';

import { IUserService } from 'core/applicationServices/User/IUserService';
import { IUserUnitOfWork } from 'core/domainServices/User/IUserUnitOfWork';
import { IUserRepository } from 'core/domainServices/User/IUserRepository';

import { RemoveUserRequest } from 'core/applicationServices/User/requests/RemoveUserReuqest';
import { DeleteUserUnitOfWorkRepositoryRequest } from 'core/domainServices/User/request/DeleteUserUnitOfWorkRepositoryRequest';
import { FetchUserRequest } from 'core/applicationServices/User/requests/FetchUserRequest';
import { FindUserRepositoryRequest } from 'core/domainServices/User/request/FindUserRepositoryRequest';
import { User } from 'core/domain/User/User';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(DOMAIN_UNIT_OF_WORK_IDENTIFIERS.USER_UNIT_OF_WORK)
    private readonly userUnitOfWork: IUserUnitOfWork,
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.USER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {}

  removeUser({ id }: RemoveUserRequest): Promise<void> {
    return this.userUnitOfWork.deleteUser(
      new DeleteUserUnitOfWorkRepositoryRequest(id)
    );
  }

  fetchUser({ id }: FetchUserRequest): Promise<User> {
    return this.userRepository.findUser(new FindUserRepositoryRequest(id));
  }

  fetchUsers(): Promise<User[]> {
    return this.userRepository.getUsers();
  }
}
