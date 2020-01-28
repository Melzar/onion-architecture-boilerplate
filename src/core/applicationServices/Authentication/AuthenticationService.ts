import { inject, injectable } from 'inversify';
import { compare } from 'bcrypt';

import { REPOSITORY_IDENTIFIERS } from 'core/CoreModuleSymbols';

import { IAuthenticationService } from 'core/applicationServices/Authentication/IAuthenticationService';

import { IUserRepository } from 'core/domainServices/IUserRepository';
import { User } from 'core/domain/User/User';
import { AuthenticationRequest } from 'core/common/requests/AuthenticationRequest';

@injectable()
export class AuthenticationService implements IAuthenticationService {
  constructor(
    @inject(REPOSITORY_IDENTIFIERS.USER_REPOSITORY)
    private readonly repository: IUserRepository
  ) {}

  async verifyCredentials(request: AuthenticationRequest) {
    const user = await this.repository.findUserByEmail(request.email); // TODO temporary should be handled with RO
    const { password } = request;

    if (!user || !(await compare(password, user?.password || ''))) {
      return undefined;
    }

    return user;
  }

  signUp(): void {
    this.repository.addUser(new User(0, '', '', 'Admin', '', '', 0));
  }
}
