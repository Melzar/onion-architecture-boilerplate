import { inject, injectable } from 'inversify';
import { compare } from 'bcrypt';

import { APPLICATION_IDENTIFIERS } from 'ui/UiModuleSymbols';
import { APP_TOKEN_LIFE, APP_TOKEN_SECRET } from 'ui/config/consts/variables';
import { JWTTokenUtil } from 'ui/config/auth/util/JWTTokenUtil';

import { REPOSITORY_IDENTIFIERS } from 'core/CoreModuleSymbols';

import { IAuthenticationService } from 'core/applicationServices/Authentication/IAuthenticationService';

import { IUserRepository } from 'core/domainServices/IUserRepository';
import { User } from 'core/domain/User';
import { AuthenticationRequest } from 'core/domain/Authentication/AuthenticationRequest';
import { Authentication } from 'core/domain/Authentication/Authentication';

// TODO Reconsider it's location in directory tree
@injectable()
export class AuthenticationService implements IAuthenticationService {
  constructor(
        @inject(REPOSITORY_IDENTIFIERS.USER_REPOSITORY) private readonly repository: IUserRepository,
        @inject(APPLICATION_IDENTIFIERS.JWT_TOKEN_UTIL) private readonly jwtTokenUtil: JWTTokenUtil,
  ) {}

  async authenticate(request: AuthenticationRequest) {
    const user = await this.repository.findUserByEmail(request.email); // TODO temporary should be handled with RO
    const {
      password,
    } = request;

    if (!await compare(password, user.password)) {
      return undefined;
    }

    return new Authentication(this.jwtTokenUtil.generateToken(
      { id: user.id, firstName: user.firstName, role: user.role },
      'user',
      APP_TOKEN_SECRET,
      APP_TOKEN_LIFE,
    ));
  }

  signUp(): void {
    this.repository.addUser(new User(
      0,
      '',
      '',
      '',
      '',
      0,
      'Admin',
    ));
  }
}
