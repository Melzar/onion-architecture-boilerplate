import { inject, injectable } from 'inversify';
import { BaseService } from 'core/applicationServices/BaseService';
import { IUserRepository } from 'core/domainServices/IUserRepository';
import { IAuthenticationService } from 'core/applicationServices/Authentication/IAuthenticationService';
import { REPOSITORY_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { User } from 'core/domain/User';
import { APPLICATION_IDENTIFIERS } from 'ui/UiModuleSymbols';
import { JWTTokenUtil } from 'ui/config/auth/util/JWTTokenUtil';
import { APP_TOKEN_LIFE, APP_TOKEN_SECRET } from 'ui/config/consts/variables';

@injectable()
export class AuthenticationService extends BaseService<IUserRepository> implements IAuthenticationService {
    private readonly jwtTokenUtil: JWTTokenUtil;

    constructor(
        @inject(REPOSITORY_IDENTIFIERS.USER_REPOSITORY) repository: IUserRepository,
        @inject(APPLICATION_IDENTIFIERS.JWT_TOKEN_UTIL) jwtTokenUtil: JWTTokenUtil,
    ) {
      super(repository);
      this.jwtTokenUtil = jwtTokenUtil;
    }

    authenticate(email: string, password: string): string | undefined { // TODO consider some kind of return objects
      // const user = await this.repository.findUserByEmail('');
      const user = new User(
        0,
        '',
        '',
        '',
        '123',
        0,
        'Admin',
      );
      if (!user) {
        return undefined;
      }
      if (user.password !== password) { // TODO bcrypt compare here
        return undefined;
      }

      return this.jwtTokenUtil.generateToken(
        { id: user.id, firstName: user.firstName, role: user.role },
        'user',
        APP_TOKEN_SECRET,
        APP_TOKEN_LIFE,
      );
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
