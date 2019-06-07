import { inject, injectable } from 'inversify';

import { IAuthenticationService } from 'core/applicationServices/Authentication/IAuthenticationService';
import { IUserRepository } from 'core/domainServices/IUserRepository';
import { BaseService } from 'core/applicationServices/BaseService';
import { User } from 'core/domain/User';

import { DATABASE_IDENTIFIERS } from 'dependency/common/DatabaseModule';

@injectable()
export class AuthenticationService extends BaseService<IUserRepository> implements IAuthenticationService {
  constructor(@inject(DATABASE_IDENTIFIERS.USER_REPOSITORY) repository: IUserRepository) {
    super(repository);
  }

  authenticate(): void {

  }

  signUp(): void {
    this.repository.addUser(new User(
      0,
      '',
      '',
      '',
      '',
      0,
    ));
  }
}
