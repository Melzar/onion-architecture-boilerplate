import { inject, injectable } from 'inversify';
import { compare } from 'bcrypt';

import { DOMAIN_REPOSITORY_IDENTIFIERS } from 'core/CoreModuleSymbols';

import { IAuthenticationService } from 'core/applicationServices/Authentication/IAuthenticationService';
import { IUserRepository } from 'core/domainServices/User/IUserRepository';

import { AuthenticationRequest } from 'core/applicationServices/Authentication/requests/AuthenticationRequest';
import { FindUserByEmailRequest } from 'core/domainServices/User/request/FindUserByEmailRequest';
import { AddUserRequest } from 'core/domainServices/User/request/AddUserRequest';
import { SignUpRequest } from 'core/applicationServices/Authentication/requests/SignUpRequest';

@injectable()
export class AuthenticationService implements IAuthenticationService {
  constructor(
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.USER_REPOSITORY)
    private readonly repository: IUserRepository
  ) {}

  signUp({
    firstName,
    email,
    lastName,
    password,
    age,
  }: SignUpRequest): Promise<void> {
    return this.repository.addUser(
      new AddUserRequest(firstName, email, lastName, password, age)
    );
  }

  async verifyCredentials({ email, password }: AuthenticationRequest) {
    const user = await this.repository.findUserByEmail(
      new FindUserByEmailRequest(email)
    );

    if (!user || !(await compare(password, user?.password || ''))) {
      return undefined;
    }

    return user;
  }
}
