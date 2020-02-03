import { inject, injectable } from 'inversify';

import { DOMAIN_REPOSITORY_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { IUserService } from 'core/applicationServices/User/IUserService';
import { IUserRepository } from 'core/domainServices/User/IUserRepository';
import { RemoveUserRequest } from 'core/applicationServices/User/requests/RemoveUserReuqest';
import { DeleteUserRequest } from 'core/domainServices/User/request/DeleteUserRequest';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.USER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {}

  removeUser({ id }: RemoveUserRequest): Promise<void> {
    return this.userRepository.deleteUser(new DeleteUserRequest(id));
  }
}
