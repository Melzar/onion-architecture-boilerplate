import { inject, injectable } from 'inversify';
import { compare } from 'bcrypt';

import {
  DOMAIN_REPOSITORY_IDENTIFIERS,
  DOMAIN_UNIT_OF_WORK_IDENTIFIERS,
} from 'core/CoreModuleSymbols';

import { IAuthenticationService } from 'core/applicationServices/Authentication/IAuthenticationService';
import { IUserRepository } from 'core/domainServices/User/IUserRepository';
import { IUserUnitOfWork } from 'core/domainServices/User/IUserUnitOfWork';

import { User } from 'core/domain/User/User';

import { AuthenticationRequest } from 'core/applicationServices/Authentication/requests/AuthenticationRequest';
import { FindUserByEmailRequest } from 'core/domainServices/User/request/FindUserByEmailRequest';
import { SignUpRequest } from 'core/applicationServices/Authentication/requests/SignUpRequest';
import { AddUserUnitOfWorkRequest } from 'core/domainServices/User/request/AddUserUnitOfWorkRequest';

@injectable()
export class AuthenticationService implements IAuthenticationService {
  constructor(
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @inject(DOMAIN_UNIT_OF_WORK_IDENTIFIERS.USER_UNIT_OF_WORK)
    private readonly userUnitOfWork: IUserUnitOfWork
  ) {}

  signUp({
    firstName,
    email,
    lastName,
    password,
    age,
  }: SignUpRequest): Promise<User> {
    return this.userUnitOfWork.addUser(
      new AddUserUnitOfWorkRequest(firstName, email, lastName, password, age)
    );
  }

  async verifyCredentials({ email, password }: AuthenticationRequest) {
    const user = await this.userRepository.findUserByEmail(
      new FindUserByEmailRequest(email)
    );

    if (!user || !(await compare(password, user?.password || ''))) {
      return undefined;
    }

    return user;
  }
}
